"use client"
import { useState } from 'react';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { devLogo } from '@/images';
import Image from 'next/image';
import Link from 'next/link';


export default function Login() {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const router = useRouter();
  const currentPathname = usePathname()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // const apiUrl = process.env.NEXT_PUBLIC || 'https://devnexus-server.onrender.com';
      const apiUrl = 'http://localhost:8000';
      const response = await axios.post(`${apiUrl}/api/users/login`, credentials);

      const { token } = response.data;
      console.log(response.data);

      const tokenExpirationDays = 7;
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + tokenExpirationDays);


      // Simulate successful login and set a token in cookies
      Cookies.set('token', token, { expires: expirationDate });

      // Redirect the user back to the initially requested page or to the root path if no specific page was requested
      const requestedURL = currentPathname || '/';
      router.push(requestedURL);
    } catch (error) {
      console.error(error);
      // Handle errors (e.g., invalid credentials, server errors)
    } finally {
      setLoading(false);
    }
  };


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
        <form onSubmit={handleSubmit}>
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