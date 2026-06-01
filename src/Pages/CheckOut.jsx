import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners"; // Import ClipLoader from react-spinners

export const Checkout = () => {
  const { id } = useParams();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pricing, setPricing] = useState(null); // pro-rata breakdown

  const reduxUser = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.token);

  useEffect(() => {
    setUser(reduxUser);
  }, [reduxUser]);

  const handle_payment = async () => {
    setIsProcessing(true); // Start spinner
    console.log(user.id,id)
    try {
      const isFreeOrTrial =
        Boolean(selectedPlan?.isTrial) || Number(selectedPlan?.price) <= 0;

      if (isFreeOrTrial) {
        const activationResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/payment/activate-free`,
          {
            packeg_id: Number(id),
            user_id: user.id,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (activationResponse?.data?.data === "success") {
          window.location.href =
            activationResponse.data.redirectUrl ||
            "https://hotel-main-dashboard.onrender.com";
          return;
        }
        throw new Error("Package activation failed");
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/payment/create_chapa`,
        {
          packeg_id: Number(id),
          user_id: user.id,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response, "my response");
      window.location.href = response.data.data.checkout_url;
    } catch (error) {
      console.error("Payment request failed:", error);
      alert(
        error?.response?.data?.message ||
          "Unable to process this package right now."
      );
    } finally {
      setIsProcessing(false); // Stop spinner
    }
  };

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/packeage/${id}`
        );
        setSelectedPlan(response.data);
      } catch (error) {
        setError("Failed to load plan details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [id]);

  // Fetch pro-rata pricing breakdown once both plan and user are ready
  useEffect(() => {
    if (!selectedPlan || !user?.id || !accessToken) return;
    const isFreeOrTrial = selectedPlan.isTrial || Number(selectedPlan.price) <= 0;
    if (isFreeOrTrial) return;

    axios
      .get(`${import.meta.env.VITE_API_URL}/payment/upgrade-preview`, {
        params: { packeg_id: Number(id), user_id: user.id },
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      .then((res) => setPricing(res.data))
      .catch(() => setPricing(null)); // fail silently — full price is the fallback
  }, [selectedPlan, user, accessToken, id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!selectedPlan) {
    return <div className="text-center">Plan not found.</div>;
  }

  return (
    <section id="checkout" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h2>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {selectedPlan.name}
              </h3>

              {/* Price breakdown */}
              {pricing && pricing.proRataCredit > 0 ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between text-gray-600 mb-1">
                    <span>
                      {selectedPlan.name} ({selectedPlan.sub_date}{" "}
                      {selectedPlan.durationUnit})
                    </span>
                    <span>ETB {pricing.fullPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600 mb-3">
                    <span>
                      Unused days credit ({pricing.remainingDays} days remaining)
                    </span>
                    <span>− ETB {pricing.proRataCredit.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-blue-200 pt-3 flex justify-between items-baseline">
                    <span className="text-lg font-bold text-gray-800">
                      You pay today
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl text-blue-600">ETB</span>
                      <span className="text-4xl font-bold text-blue-600">
                        {pricing.chargeAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Your current plan's unused days are credited toward this upgrade.
                    The new plan starts today and runs for {selectedPlan.sub_date}{" "}
                    {selectedPlan.durationUnit}.
                  </p>
                </div>
              ) : (
                <div className="flex items-center text-4xl font-bold text-blue-600 mb-4">
                  <span className="text-2xl">ETB</span>
                  <span>{selectedPlan.price}</span>
                  <span className="text-xl text-gray-500 ml-2">
                    / {selectedPlan.sub_date} {selectedPlan.durationUnit}
                  </span>
                </div>
              )}

              <p className="text-gray-600 mb-6">{selectedPlan.description}</p>

              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                Features Included:
              </h4>
              <ul className="space-y-2">
                {selectedPlan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <i className="bi bi-check-circle-fill text-blue-500 mr-2"></i>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handle_payment()}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 flex justify-center items-center"
              disabled={isProcessing} // Disable button when processing
            >
              {isProcessing ? (
                <ClipLoader color="#ffffff" size={20} />
              ) : (
                <>
                  {Boolean(selectedPlan?.isTrial) || Number(selectedPlan?.price) <= 0
                    ? "Activate Package"
                    : pricing?.proRataCredit > 0
                    ? `Pay ETB ${pricing.chargeAmount.toFixed(2)}`
                    : "Confirm Payment"}{" "}
                  <i className="bi bi-arrow-right ml-2"></i>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
