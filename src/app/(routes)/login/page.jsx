"use client"
import { useState } from 'react';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';


export default function Login() {
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
      const response = await axios.post('http://localhost:8000/api/users/login', credentials);

      const { token } = response.data;
      console.log(response.data);

      // Simulate successful login and set a token in cookies
      Cookies.set('token', token);

      // const requestedURL = router.query.redirect || '/';
      // router.push(requestedURL);
      router.push(currentPathname);

    } catch (error) {
      console.error(error);
      // Handle errors (e.g., invalid credentials, server errors)
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Username or Email:</label>
            <input
              type="text"
              name="usernameOrEmail"
              value={credentials.usernameOrEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600">Password:</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}