"use client"
// Signup.js
import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import useSignup from "@/hooks/useSignup";
import VerificationPopup from '@/components/VerificationPopup';
import Message from "@/components/comLayout/create-code-comp/Message";
import { devLogo } from "@/images";
import { FaSpinner } from 'react-icons/fa';

function Signup() {
  const {
    formData,
    successMessage,
    error,
    loading,
    otpSent,
    showOtpInput,
    showVerificationPopup,
    handleChange,
    handleResendOTP,
    handleVerifyOTP,
    handleSubmit,
    closeVerificationPopup,
  } = useSignup();

  const [message, setMessage] = useState(null);

  // Function to close the message
  const closeMessage = () => {
    setMessage(null);
  };

  const getTitle = () => (otpSent && showOtpInput ? 'Verify Account' : 'Sign Up');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 mx-2 bg-white border-t-4 border-blue-600 rounded-lg shadow-lg sm:mx-0">
        <div className="flex items-center justify-center mb-6">
          <Image
            src={devLogo}
            alt="Logo"
            width={48}
            height={48}
          />
          <h2 className="text-3xl font-extrabold text-blue-500">{getTitle()}</h2>
        </div>

        {/* Display custom messages based on success or failure */}
        {successMessage && (
          <Message type="success" message="Register Successfully" onClose={closeMessage} />
        )}
        {error && (
          <Message type="error" message={error.message || "Failed: Please fill out the entire form"} onClose={closeMessage} />
        )}

        {otpSent && showOtpInput && (
          <form onSubmit={handleVerifyOTP} className="p-6 mb-4 bg-white rounded-md shadow-md">
            <label className="block mb-4 text-sm font-bold text-gray-700" htmlFor="otp">
              Enter the 6-digit OTP sent to your email:
            </label>
            <div className="relative flex items-center mb-4">
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                pattern="[0-9]*"
                inputMode="numeric"
                maxLength="6"
                className="w-full px-4 py-2 text-gray-700 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 123456"
                required
              />
              <button
                type="submit"
                className="absolute right-0 px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Verify
              </button>
            </div>
            <p className="text-sm text-gray-600">
              <span className='font-bold text-red-500'>Note:</span> If the OTP email isn't visible in your inbox, kindly check your spam or junk folder to ensure a smooth authentication process.
            </p>
          </form>
        )}

        {!otpSent && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="name">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a valid email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">
                Username:
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username (e.g., john_doe123)"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="confirmPassword">
                Confirm Password:
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
                required
              />
            </div>
            <button
              type="submit"
              className={`flex items-center justify-center w-full py-3 text-white rounded-md ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="mr-2 animate-spin" />
                  Please wait...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>
        )}
        {otpSent && (
          <div className="text-right">
            <button
              onClick={handleResendOTP}
              className="text-sm text-blue-500 hover:underline focus:outline-none"
            >
              Resend OTP
            </button>
          </div>
        )}
        {!otpSent && (
          <p className="mt-4 text-sm text-center text-gray-700">
            If you already registered?{' '}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        )}
        {showVerificationPopup && (
          <VerificationPopup onClose={closeVerificationPopup} />
        )}
      </div>
    </div>
  );
}

export default Signup;


