"use client"
// Login.js
import Image from 'next/image';
import Link from 'next/link';
import useLogin from "@/hooks/useLogin";
import { devLogo } from "@/images";
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';

function Login() {
  const { loading, credentials, error, handleChange, handleSubmit } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const usernameOrEmailInputRef = useRef(null);

  useEffect(() => {
    // Focus on the username or email input field when the component mounts
    usernameOrEmailInputRef.current.focus();
  }, []);

  // Function to toggle show/hide password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-animation" />
      <div className="z-10 w-full max-w-md p-6 bg-white border-t-4 border-blue-600 rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <Image
            src={devLogo}
            alt="Logo"
            width={48}
            height={48}
          />
          <h2 className="text-3xl font-extrabold text-blue-500">Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700" htmlFor="usernameOrEmail">
              Username or Email:
            </label>
            <input
              ref={usernameOrEmailInputRef} // Add ref here
              type="text"
              name="usernameOrEmail"
              value={credentials.usernameOrEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username or email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700" htmlFor="password">
              Password:
            </label>
            <div className="relative flex items-center mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-0 px-4 py-2 text-gray-600 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
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
              'Login'
            )}
          </button>
          {error && <p className="text-red-500">{error.message}</p>}
        </form>
        <p className="mt-4 text-sm text-center text-gray-700">
          Not registered?{' '}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;