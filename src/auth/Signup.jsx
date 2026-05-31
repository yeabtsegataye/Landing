import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useSignupMutation } from "../features/auth/authApiSlice";
import SignupImage from "../assets/Signup.png"; // Import your image from assets
import { ClipLoader } from "react-spinners"; // Import the spinner component
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const Signup = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [signup] = useSignupMutation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",     // fix: was missing from initial state
    email: "",
    password: "",
    passwordConfirm: "",
    hotel_name: "",
    hotel_description: "",
    referralCode: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [referralValid, setReferralValid] = useState(null); // null=unchecked, true, false

  const checkReferralCode = async (code) => {
    if (!code.trim()) { setReferralValid(null); return; }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/referrals/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim().toUpperCase() }),
      });
      const data = await res.json();
      setReferralValid(data.valid === true);
    } catch { setReferralValid(false); }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errors = formErrors;

    switch (name) {
      case "email":
        errors.email = value.match(/^([\w.%+-]+)@([\w-]{2,}\.)+([\w]{2,})$/i)
          ? ""
          : "Email is invalid";
        break;
      case "password":
        errors.password = value.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/
        )
          ? ""
          : "Password must contain at least 8 characters, UPPER/lowercase, number, and special character";
        break;
      case "passwordConfirm":
        errors.passwordConfirm =
          value === formData.password ? "" : "Passwords do not match";
        break;
      default:
        break;
    }

    setFormErrors(errors);
    setFormValid(!Object.values(errors).some((error) => error.length > 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValid) {
      setIsLoading(true); // Set loading to true when submitting
      try {
        const encryptedPassword = CryptoJS.AES.encrypt(
          formData.password,
          SECRET_KEY
        ).toString();

        const encryptedFormData = {
          ...formData,
          Password: encryptedPassword,
          referralCode: formData.referralCode.trim().toUpperCase() || undefined,
        };
console.log(encryptedFormData,'ffddd')
        const response = await signup(encryptedFormData).unwrap();

        if (response.accessToken) {
          dispatch(setCredentials(response));
          
          toast({
            title: "Signup successful",
            description: "You have successfully signed up",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          navigate("/");
        }
      } catch (error) {
        toast({
          title: "Error signing up",
          description: error?.data ||error?.data?.message || "An unexpected error occurred",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        console.error("Signup error", error);
      } finally {
        setIsLoading(false); // Set loading to false after the request is complete
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-100 to-sky-200 p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Image Section - Hidden on small screens */}
        <div className="hidden md:block w-full md:w-1/2 bg-blue-50 flex items-center justify-center p-8">
          <img
            src={SignupImage}
            alt="Signup Illustration"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Create New Account
            </h2>
            <p className="text-gray-600">Join us and start your journey</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name and Father Name */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    formErrors.name
                      ? "border-red-500"
                      : formData.name && "border-green-500"
                  }`}
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="fatherName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Father Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  id="fatherName"
                  name="fatherName"
                  placeholder="Enter your father's name"
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email and Password */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    formErrors.email
                      ? "border-red-500"
                      : formData.email && "border-green-500"
                  }`}
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${formErrors.password ? "border-red-500" : formData.password && "border-green-500"}`}
                    id="password" name="password" placeholder="Enter your password"
                    value={formData.password} onChange={handleChange} required
                  />
                  <button type="button" tabIndex={-1} onClick={() => setShowPassword(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none">
                    {showPassword
                      ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    }
                  </button>
                </div>
                {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    className={`w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${formErrors.passwordConfirm ? "border-red-500" : formData.passwordConfirm && "border-green-500"}`}
                    id="passwordConfirm" name="passwordConfirm" placeholder="Confirm your password"
                    value={formData.passwordConfirm} onChange={handleChange} required
                  />
                  <button type="button" tabIndex={-1} onClick={() => setShowConfirm(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none">
                    {showConfirm
                      ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    }
                  </button>
                </div>
                {formErrors.passwordConfirm && <p className="text-red-500 text-sm mt-1">{formErrors.passwordConfirm}</p>}
              </div>
              {/* Hotel Name and Hotel Description */}
              <div className="mb-4">
                <label
                  htmlFor="hotel_name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Hotel Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  id="hotel_name"
                  name="hotel_name"
                  placeholder="Enter your hotel name"
                  value={formData.hotel_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="hotel_description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Hotel Description
                </label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  id="hotel_description"
                  name="hotel_description"
                  placeholder="Enter your hotel description"
                  value={formData.hotel_description}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Referral code — spans both columns */}
              <div className="mb-2 md:col-span-2">
                <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Referral Code{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="referralCode"
                    name="referralCode"
                    placeholder="e.g. REF-XKZW8PLM"
                    value={formData.referralCode}
                    onChange={handleChange}
                    onBlur={(e) => checkReferralCode(e.target.value)}
                    className={`w-full px-4 py-2 pr-28 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all uppercase tracking-widest ${
                      referralValid === true
                        ? "border-green-500 bg-green-50"
                        : referralValid === false
                        ? "border-red-400"
                        : ""
                    }`}
                  />
                  {referralValid === true && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 text-sm font-semibold">
                      ✓ Valid code
                    </span>
                  )}
                  {referralValid === false && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 text-sm">
                      Invalid
                    </span>
                  )}
                </div>
                {referralValid === true && (
                  <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
                    🎁 Great! You'll receive bonus license days automatically after your first payment.
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all flex items-center justify-center"
              disabled={!formValid || isLoading}
            >
              {isLoading ? (
                <ClipLoader color="#ffffff" size={20} /> // Show spinner when loading
              ) : (
                "Sign Up" // Show "Sign Up" text when not loading
              )}
            </button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a href="/Login" className="text-blue-500 hover:underline">
                  Sign In
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
