"use client"
// Login.js
import useLogin from "@/hooks/useLogin";
import Image from 'next/image';
import Link from 'next/link';
import { devLogo } from "@/images";

function Login() {
  const { loading, credentials, error, handleChange, handleSubmit } = useLogin();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white border-t-4 border-blue-600 rounded-lg shadow-lg">
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
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Please wait...' : 'Login'}
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
