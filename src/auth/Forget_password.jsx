import React, { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { ClipLoader } from "react-spinners";
import { useSendResetCodeMutation, useResetPasswordMutation } from "../features/auth/authApiSlice";
import validator from "validator"; // For input validation
import DOMPurify from "dompurify"; // For input sanitization

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isCodeDisabled, setIsCodeDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0); // Cooldown timer in seconds
  const toast = useToast();

  const [sendResetCode] = useSendResetCodeMutation();
  const [resetPassword] = useResetPasswordMutation();

  // Validate email format
  const validateEmail = (email) => {
    return validator.isEmail(email);
  };

  // Sanitize inputs
  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input.trim());
  };

  // Handle sending reset code
  const handleSendCode = async () => {
    if (!validateEmail(email)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", status: "error", duration: 5000, isClosable: true });
      return;
    }

    setIsLoading(true);
    try {
      const response = await sendResetCode(email).unwrap();
      console.log("OTP Response:", response);
      toast({ title: "Code Sent", description: "Check your email for the reset code.", status: "success", duration: 5000, isClosable: true });
      setIsCodeDisabled(true);
      setCooldown(60); // 3-minute cooldown
      setIsDisabled(false);
    } catch (error) {
      toast({ title: "Error", description: error?.data?.message || "Failed to send reset code.", status: "error", duration: 5000, isClosable: true });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resetting password
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match!", status: "error", duration: 5000, isClosable: true });
      return;
    }

    if (newPassword.length < 8) {
      toast({ title: "Weak Password", description: "Password must be at least 8 characters long.", status: "error", duration: 5000, isClosable: true });
      return;
    }

    setIsLoading(true);
    try {
      const sanitizedEmail = sanitizeInput(email);
      const sanitizedOtp = sanitizeInput(otp);
      const sanitizedPassword = sanitizeInput(newPassword);

      await resetPassword({ email: sanitizedEmail, otp: sanitizedOtp, newPassword: sanitizedPassword }).unwrap();
      toast({ title: "Success", description: "Password reset successfully.", status: "success", duration: 5000, isClosable: true });
    } catch (error) {
      toast({ title: "Error", description: error?.data?.message || "Failed to reset password.", status: "error", duration: 5000, isClosable: true });
    } finally {
      setIsLoading(false);
    }
  };

  // Cooldown timer for the "Send Reset Code" button
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setIsCodeDisabled(false);
    }
  }, [cooldown]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password?</h2>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="email"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            onClick={handleSendCode}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            disabled={isCodeDisabled || !email || cooldown > 0}
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={20} />
            ) : cooldown > 0 ? (
              `Resend in ${cooldown}s`
            ) : (
              "Send_Code"
            )}
          </button>
        </div>
        <input
          type="text"
          className="w-full p-2 border rounded-lg mb-2 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter reset code"
          value={otp}
          onChange={(e) => setCode(e.target.value)}
          disabled={isDisabled}
        />
        <input
          type="password"
          className="w-full p-2 border rounded-lg mb-2 focus:ring-2 focus:ring-blue-500"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={isDisabled}
        />
        <input
          type="password"
          className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isDisabled}
        />
        <button
          onClick={handleResetPassword}
          className="w-full bg-green-500 text-white py-2 rounded-lg disabled:opacity-50"
          disabled={isDisabled || !otp || !newPassword || !confirmPassword}
        >
          {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "Reset Password"}
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;