import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";
import { useToast } from "@chakra-ui/react";
import Notif_Toast from "../Components/Tost";
import LoginImage from "../assets/Login2.png";
import { ClipLoader } from "react-spinners";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateEmail = (value) => {
    const emailValid = value.match(/^([\w.%+-]+)@([\w-]{2,}\.)+([\w]{2,})$/i);
    setEmailError(emailValid ? "" : "Email is invalid");
    setFormValid(emailValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValid) {
      setIsLoading(true); // Set loading to true when submitting
      try {
        const userData = await login({
          email,
          Password: password,
        }).unwrap();
        if (userData) {
          dispatch(setCredentials(userData));
          toast({
            title: "Login successful",
            description: "You have successfully Logged in",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          navigate("/");
        }
      } catch (error) {
        toast({
          title: "Error Logging in",
          description:  error?.data?.message ||error?.data ||"An unexpected error occurred",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } finally {
        setIsLoading(false); // Set loading to false after the request is complete
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-100 to-sky-200 p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Image Section - Hidden on small screens */}
        <div className="hidden md:block w-full md:w-1/2  flex items-center justify-center ">
          <img
            src={LoginImage}
            alt="Login Illustration"
            className="w-full h-auto object-cover  flex items-center justify-center"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  emailError ? "border-red-500" : email && "border-green-500"
                }`}
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <button type="button" tabIndex={-1} onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none">
                  {showPassword
                    ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  }
                </button>
              </div>
              <div className="text-right mt-2">
                <a href="/forgot_password" className="text-sm text-blue-500 hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-500 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Remember Me</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all flex items-center justify-center"
              disabled={!formValid || isLoading}
            >
              {isLoading ? (
                <ClipLoader color="#ffffff" size={20} /> // Show spinner when loading
              ) : (
                "Log In" // Show "Log In" text when not loading
              )}
            </button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="/signup" className="text-blue-500 hover:underline">
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;