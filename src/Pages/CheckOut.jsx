import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

const API = import.meta.env.VITE_API_URL;

export const Checkout = () => {
  const { id } = useParams();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pricing, setPricing] = useState(null);

  // Payment method state
  const [activeMethod, setActiveMethod] = useState(null); // null until loaded
  const [methodLoading, setMethodLoading] = useState(true);
  const [bankAccounts, setBankAccounts] = useState(null);

  // Leul flow state
  const [leulStep, setLeulStep] = useState("init"); // 'init' | 'instructions' | 'pending' | 'rejected'
  const [txRef, setTxRef] = useState("");
  const [reference, setReference] = useState("");
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [submitError, setSubmitError] = useState("");
  const [rejectMessage, setRejectMessage] = useState("");
  const [countdown, setCountdown] = useState(5);
  const [copiedKey, setCopiedKey] = useState(null);

  const reduxUser = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.token);

  useEffect(() => { setUser(reduxUser); }, [reduxUser]);

  // Fetch plan
  useEffect(() => {
    axios.get(`${API}/packeage/${id}`)
      .then((r) => setSelectedPlan(r.data))
      .catch(() => setError("Failed to load plan details. Please try again."))
      .finally(() => setLoading(false));
  }, [id]);

  // Fetch active payment method from settings
  useEffect(() => {
    axios.get(`${API}/super/payment-settings`)
      .then((r) => setActiveMethod(r.data.activeMethod ?? "chapa"))
      .catch(() => setActiveMethod("chapa"))
      .finally(() => setMethodLoading(false));
  }, []);

  // Fetch pro-rata pricing
  useEffect(() => {
    if (!selectedPlan || !user?.id || !accessToken) return;
    if (selectedPlan.isTrial || Number(selectedPlan.price) <= 0) return;

    axios.get(`${API}/payment/upgrade-preview`, {
      params: { packeg_id: Number(id), user_id: user.id },
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    })
      .then((r) => setPricing(r.data))
      .catch(() => setPricing(null));
  }, [selectedPlan, user, accessToken, id]);

  // ── Chapa payment ──────────────────────────────────────────────────────────

  const handleChapaPayment = async () => {
    setIsProcessing(true);
    try {
      const isFreeOrTrial = Boolean(selectedPlan?.isTrial) || Number(selectedPlan?.price) <= 0;

      if (isFreeOrTrial) {
        const r = await axios.post(`${API}/payment/activate-free`,
          { packeg_id: Number(id), user_id: user.id },
          { withCredentials: true, headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (r?.data?.data === "success") {
          window.location.href = r.data.redirectUrl || "https://hotel-main-dashboard.onrender.com";
          return;
        }
        throw new Error("Package activation failed");
      }

      const r = await axios.post(`${API}/payment/create_chapa`,
        { packeg_id: Number(id), user_id: user.id },
        { withCredentials: true, headers: { Authorization: `Bearer ${accessToken}` } }
      );
      window.location.href = r.data.data.checkout_url;
    } catch (err) {
      alert(err?.response?.data?.message || "Unable to process payment right now.");
    } finally {
      setIsProcessing(false);
    }
  };

  // ── Leul (bank transfer) ───────────────────────────────────────────────────

  const handleInitiateLeul = async () => {
    setIsProcessing(true);
    setSubmitError("");
    try {
      const r = await axios.post(`${API}/payment/initiate_leul`,
        { packeg_id: Number(id), user_id: String(user.id) },
        { withCredentials: true, headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setTxRef(r.data.tx_ref);
      setBankAccounts(r.data.bankAccounts);
      setPricing((prev) => ({
        ...(prev ?? {}),
        chargeAmount: r.data.chargeAmount,
        fullPrice: r.data.fullPrice,
        proRataCredit: r.data.proRataCredit,
        remainingDays: r.data.remainingDays,
        accountHolderName: r.data.accountHolderName,
        instructions: r.data.instructions,
      }));
      setLeulStep("instructions");
    } catch (err) {
      setSubmitError(err?.response?.data?.message || "Failed to initiate payment.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setReceiptFile(file);
    setReceiptPreview(URL.createObjectURL(file));
  };

  const handleSubmitLeul = async () => {
    if (!receiptFile && !reference.trim()) {
      setSubmitError("Please upload your receipt screenshot or enter the transaction reference number.");
      return;
    }
    setIsProcessing(true);
    setSubmitError("");
    try {
      const form = new FormData();
      form.append("tx_ref", txRef);
      form.append("user_id", String(user.id));
      form.append("packeg_id", String(id));
      if (reference.trim()) form.append("reference", reference.trim());
      if (receiptFile) form.append("receipt", receiptFile);

      const r = await axios.post(`${API}/payment/submit_leul`, form, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (r.data.data === "success") {
        window.location.href = r.data.redirectUrl || "https://hotel-main-dashboard.onrender.com";
      } else if (r.data.data === "pending_review") {
        setLeulStep("pending");
      } else {
        setSubmitError("Something went wrong. Please try again or contact support.");
      }
    } catch (err) {
      const status = err?.response?.status;
      const msg = err?.response?.data?.message || "Failed to submit receipt. Please try again.";
      // 4xx = instant rejection (wrong account, duplicate, insufficient amount, etc.)
      if (status >= 400 && status < 500) {
        setRejectMessage(msg);
        setLeulStep("rejected");
        setCountdown(5);
        const timer = setInterval(() => {
          setCountdown((c) => {
            if (c <= 1) {
              clearInterval(timer);
              window.location.href = "/";
            }
            return c - 1;
          });
        }, 1000);
      } else {
        setSubmitError(msg);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // ── Account click: copy + open app ────────────────────────────────────────
  const APP_SCHEMES = {
    telebirr: "telebirr://",
    cbe:      "cbebirr://",
    dashen:   null,
    abyssinia: null,
  };

  const handleAccountClick = (key, value) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 2000);

    const scheme = APP_SCHEMES[key];
    if (scheme) {
      const a = document.createElement("a");
      a.href = scheme;
      a.click();
    }
  };

  // ── Render helpers ─────────────────────────────────────────────────────────

  const chargeDisplay = pricing?.chargeAmount ?? selectedPlan?.price ?? 0;
  const isFreeOrTrial = Boolean(selectedPlan?.isTrial) || Number(selectedPlan?.price) <= 0;

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-20">{error}</div>;
  if (!selectedPlan) return <div className="text-center py-20">Plan not found.</div>;

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h2>

            {/* Plan info */}
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{selectedPlan.name}</h3>

              {pricing?.isSamePackage ? (
                /* Same package: renewing — just add days, charge full price */
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-gray-700 font-medium">Renew — {selectedPlan.name}</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl text-blue-600">ETB</span>
                      <span className="text-3xl font-bold text-blue-600">{pricing.chargeAmount}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    +{selectedPlan.sub_date} {selectedPlan.durationUnit} added on top of your remaining days.
                  </p>
                </div>
              ) : pricing?.proRataCredit > 0 ? (
                /* Upgrade with pro-rata credit */
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between text-gray-600 mb-1">
                    <span>{selectedPlan.name} ({selectedPlan.sub_date} {selectedPlan.durationUnit})</span>
                    <span>ETB {Number(pricing.fullPrice).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600 mb-3">
                    <span>Unused days credit ({pricing.remainingDays} days remaining)</span>
                    <span>− ETB {Number(pricing.proRataCredit).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-blue-200 pt-3 flex justify-between items-baseline">
                    <span className="text-lg font-bold text-gray-800">You pay today</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl text-blue-600">ETB</span>
                      <span className="text-4xl font-bold text-blue-600">{pricing.chargeAmount}</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* New purchase, full price */
                <div className="flex items-center text-4xl font-bold text-blue-600 mb-4">
                  <span className="text-2xl">ETB</span>
                  <span>{selectedPlan.price}</span>
                  <span className="text-xl text-gray-500 ml-2">/ {selectedPlan.sub_date} {selectedPlan.durationUnit}</span>
                </div>
              )}

              <p className="text-gray-600 mb-4">{selectedPlan.description}</p>
              <ul className="space-y-2 mb-6">
                {selectedPlan.features?.map((f, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <i className="bi bi-check-circle-fill text-blue-500 mr-2"></i>{f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment section — wait for method to load to avoid flash */}
            {methodLoading ? (
              <div className="flex justify-center py-6">
                <ClipLoader color="#2563eb" size={28} />
              </div>
            ) : isFreeOrTrial ? (
              <button
                onClick={handleChapaPayment}
                disabled={isProcessing}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition flex justify-center items-center"
              >
                {isProcessing ? <ClipLoader color="#fff" size={20} /> : "Activate Package"}
              </button>
            ) : activeMethod === "leul" ? (
              /* ── Leul flow ── */
              <div>
                {leulStep === "init" && (
                  <button
                    onClick={handleInitiateLeul}
                    disabled={isProcessing}
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition flex justify-center items-center"
                  >
                    {isProcessing ? <ClipLoader color="#fff" size={20} /> : (
                      <>Pay ETB {Number(chargeDisplay).toFixed(2)} via Bank Transfer</>
                    )}
                  </button>
                )}

                {leulStep === "instructions" && (
                  <div className="space-y-5">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                      <h4 className="text-lg font-semibold text-green-800 mb-3">
                        Transfer ETB {Number(chargeDisplay).toFixed(2)} to any of the accounts below
                      </h4>
                      {pricing?.accountHolderName && (
                        <p className="text-gray-700 mb-3 font-medium">Account Holder: <span className="text-green-700">{pricing.accountHolderName}</span></p>
                      )}
                      <div className="grid gap-2">
                        {[
                          { key: "cbe",       label: "CBE",              value: bankAccounts?.cbe },
                          { key: "telebirr",  label: "Telebirr",         value: bankAccounts?.telebirr },
                          { key: "dashen",    label: "Dashen Bank",      value: bankAccounts?.dashen },
                          { key: "abyssinia", label: "Bank of Abyssinia",value: bankAccounts?.abyssinia },
                        ].filter(a => a.value).map(({ key, label, value }) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => handleAccountClick(key, value)}
                            className="flex justify-between items-center w-full bg-white rounded-lg px-4 py-3 border border-green-100 hover:border-green-400 hover:bg-green-50 active:scale-[0.98] transition-all cursor-pointer text-left"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600 font-medium">{label}</span>
                              {APP_SCHEMES[key] && (
                                <span className="text-xs bg-green-100 text-green-700 rounded-full px-2 py-0.5">
                                  Open app
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-gray-900">{value}</span>
                              {copiedKey === key ? (
                                <span className="text-xs text-green-600 font-semibold">Copied!</span>
                              ) : (
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                      {pricing?.instructions && (
                        <p className="mt-3 text-sm text-gray-600">{pricing.instructions}</p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <p className="text-gray-700 font-medium">After transferring, submit your receipt:</p>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Transaction Reference Number (optional)
                        </label>
                        <input
                          type="text"
                          value={reference}
                          onChange={(e) => setReference(e.target.value)}
                          placeholder="e.g. FT253089F68Z"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Receipt Screenshot <span className="text-red-500">*</span>
                        </label>
                        <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 bg-gray-50">
                          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                          {receiptPreview ? (
                            <img src={receiptPreview} alt="receipt" className="h-32 object-contain rounded" />
                          ) : (
                            <div className="text-center text-gray-500">
                              <i className="bi bi-cloud-upload text-3xl block mb-1"></i>
                              <span className="text-sm">Click to upload screenshot</span>
                            </div>
                          )}
                        </label>
                      </div>

                      {submitError && (
                        <p className="text-red-600 text-sm">{submitError}</p>
                      )}

                      <button
                        onClick={handleSubmitLeul}
                        disabled={isProcessing}
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition flex justify-center items-center gap-2"
                      >
                        {isProcessing ? (
                          <>
                            <ClipLoader color="#fff" size={18} />
                            <span>Verifying payment...</span>
                          </>
                        ) : "Submit Receipt"}
                      </button>
                      {isProcessing && (
                        <p className="text-center text-sm text-gray-500 mt-1">
                          Checking your receipt with Leul — this may take a few seconds.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {leulStep === "pending" && (
                  <div className="text-center py-8">
                    <div className="text-5xl mb-4">⏳</div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Receipt Submitted!</h4>
                    <p className="text-gray-600">
                      We could not automatically verify your transaction reference. Your receipt has been saved and will be reviewed shortly. Your subscription will be activated once confirmed.
                    </p>
                  </div>
                )}

                {leulStep === "rejected" && (
                  <div className="text-center py-8">
                    <div className="text-5xl mb-4">❌</div>
                    <h4 className="text-xl font-semibold text-red-700 mb-2">Payment Rejected</h4>
                    <p className="text-gray-700 mb-4">{rejectMessage}</p>
                    <p className="text-sm text-gray-500">
                      Redirecting to home in <span className="font-bold text-red-600">{countdown}</span> second{countdown !== 1 ? "s" : ""}…
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* ── Chapa flow ── */
              <button
                onClick={handleChapaPayment}
                disabled={isProcessing}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition flex justify-center items-center"
              >
                {isProcessing ? <ClipLoader color="#fff" size={20} /> : (
                  <>
                    {pricing?.isSamePackage
                      ? `Renew — Pay ETB ${pricing.chargeAmount}`
                      : pricing?.proRataCredit > 0
                      ? `Pay ETB ${pricing.chargeAmount}`
                      : "Confirm Payment"}
                    <i className="bi bi-arrow-right ml-2"></i>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
