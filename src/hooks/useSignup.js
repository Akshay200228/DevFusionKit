// useSignup.js

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const useSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return setError({ message: 'Password and confirm password do not match' });
    }

    try {
      // const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL || "http://localhost:8000";
      // const apiUrl = "https://devnexus-server.onrender.com";
      const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;
      const response = await axios.post(`${apiUrl}/api/users/signup`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Example: Log the response to the console
      console.log('Signup Response:', response);

      setSuccessMessage('User registered successfully! Moye Moye');
      router.push('/login');
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return { formData, successMessage, error, handleChange, handleSubmit };
};

export default useSignup;
