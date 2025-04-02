import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useSignupMutation } from "../features/auth/authApiSlice";
import SignupImage from "../assets/Signup.png";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const Signup = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [signup] = useSignupMutation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    hotel_name: "",
    hotel_description: "",
    phone: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errors = formErrors;

    switch (name) {
      case "firstName":
        errors.firstName = value.trim() ? "" : "First name is required";
        break;
      case "lastName":
        errors.lastName = value.trim() ? "" : "Last name is required";
        break;
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
      case "phone":
        errors.phone = value.match(/^[0-9]{10,15}$/)
          ? ""
          : "Phone number must be 10-15 digits";
        break;
      default:
        break;
    }

    setFormErrors(errors);
    
    // Check if all required fields are filled and valid
    const requiredFields = ['firstName', 'lastName', 'email', 'password', 'passwordConfirm', 'hotel_name', 'hotel_description', 'phone'];
    const allFieldsFilled = requiredFields.every(field => formData[field] && formData[field].trim() !== '');
    const noErrors = !Object.values(errors).some(error => error && error.length > 0);
    
    setFormValid(allFieldsFilled && noErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValid) {
      setIsLoading(true);
      try {
        const encryptedPassword = CryptoJS.AES.encrypt(
          formData.password,
          SECRET_KEY
        ).toString();

        const encryptedFormData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          Password: encryptedPassword,
          phone: formData.phone,
          hotel_name: formData.hotel_name,
          hotel_description: formData.hotel_description
        };

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
          description: error?.data || error?.data?.message || "An unexpected error occurred",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        console.error("Signup error", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-100 to-sky-200 p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Image Section */}
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
              {/* First Name and Last Name */}
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    formErrors.firstName
                      ? "border-red-500"
                      : formData.firstName && "border-green-500"
                  }`}
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    formErrors.lastName
                      ? "border-red-500"
                      : formData.lastName && "border-green-500"
                  }`}
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
                )}
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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    formErrors.password
                      ? "border-red-500"
                      : formData.password && "border-green-500"
                  }`}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {formErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label
                  htmlFor="passwordConfirm"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    formErrors.passwordConfirm
                      ? "border-red-500"
                      : formData.passwordConfirm && "border-green-500"
                  }`}
                  id="passwordConfirm"
                  name="passwordConfirm"
                  placeholder="Confirm your password"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  required
                />
                {formErrors.passwordConfirm && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.passwordConfirm}
                  </p>
                )}
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
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    formErrors.hotel_name
                      ? "border-red-500"
                      : formData.hotel_name && "border-green-500"
                  }`}
                  id="hotel_name"
                  name="hotel_name"
                  placeholder="Enter your hotel name"
                  value={formData.hotel_name}
                  onChange={handleChange}
                  required
                />
                {formErrors.hotel_name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.hotel_name}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="hotel_description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Hotel Description
                </label>
                <textarea
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    formErrors.hotel_description
                      ? "border-red-500"
                      : formData.hotel_description && "border-green-500"
                  }`}
                  id="hotel_description"
                  name="hotel_description"
                  placeholder="Enter your hotel description"
                  value={formData.hotel_description}
                  onChange={handleChange}
                  required
                />
                {formErrors.hotel_description && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.hotel_description}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    formErrors.phone
                      ? "border-red-500"
                      : formData.phone && "border-green-500"
                  }`}
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.phone}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all flex items-center justify-center disabled:bg-blue-300 disabled:cursor-not-allowed"
              disabled={!formValid || isLoading}
              title={!formValid ? "Please fill all required fields correctly" : ""}
            >
              {isLoading ? (
                <ClipLoader color="#ffffff" size={20} />
              ) : (
                "Sign Up"
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