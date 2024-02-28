"use client"
// Login.js
import { useEffect, useRef, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import useLogin from "@/hooks/useLogin";
import { devLogo } from "@/images";
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';


function Login() {
  const { loading, credentials, error, handleChange, handleSubmit } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const usernameOrEmailInputRef = useRef(null);
  const router = useRouter();

  const clientId = "1074299599837-4lbh376sv07rpk6295tsemmgrnhkkga4.apps.googleusercontent.com"

  useEffect(() => {
    // Focus on the username or email input field when the component mounts
    usernameOrEmailInputRef.current.focus();
  }, []);

  const handleGoogleLogin = async (response) => {
    try {
      console.log("Start heating api....")
      console.log("Start ", response)
      const tokenId = response.credential; // Extract the tokenId from the response
      console.log("tokenId: ", tokenId)

      if (!tokenId) {
        console.error("TokenId is undefined");
        return;
      }
      const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;
      console.log("Define api url")
      // Make a POST request to your backend API with the tokenId
      const { data } = await axios.post(`${apiUrl}/api/users/google`, { idToken: tokenId });
      console.log("Data: ", data)
      const dataToken = data.token;
      console.log("Data token: ", dataToken)

      if (data.token) {
        // Store the token in local storage or session storage for future authenticated requests
        console.log("Start condition")
        const tokenExpirationDays = 7;
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + tokenExpirationDays);

        document.cookie = `token=${dataToken}; expires=${expirationDate.toUTCString()}; path=/`;
        // Redirect the user to the homepage or dashboard
        router.push('/');
        window.location.reload();
      } else {
        console.error(data.error);
        // Handle login error
      }
    } catch (error) {
      console.error(error);
      // Handle other errors
    }
    console.log("DOne")
  };

  // Function to toggle show/hide password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-animation" />
      <div className="z-10 w-full max-w-md p-6 mx-2 bg-white border-t-4 border-blue-600 rounded-lg shadow-lg">
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

            <p className="mt-2 text-sm text-blue-500 underline cursor-pointer text-end">
              <Link href="/forgot-password">Forgot Password?</Link>
            </p>

          </div>
          <button
            type="submit"
            className={`flex items-center justify-center w-full py-3 text-white rounded-md ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg hover:scale-105 transition duration-300 transform'}`}
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

          {/* Divider */}
          <div className="flex items-center justify-center py-4">
            <hr className="w-screen border-t border-gray-600" />
            <p className="px-2">OR</p>
            <hr className="w-screen border-t border-gray-600" />
          </div>

          {/* Google login button */}
          <div className='flex items-center justify-center'>
            <GoogleLogin
              clientId={clientId}
              buttonText="Login with Google"
              onSuccess={credentialRespone => {
                console.log("Credential Response:", credentialRespone);
                handleGoogleLogin(credentialRespone); // Pass the entire response object to handleGoogleLogin
              }}
              onFailure={() => {
                console.log("Login failed");
              }}
            />

          </div>
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
