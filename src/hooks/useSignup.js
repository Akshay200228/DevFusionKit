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
    avatar: '', // Add a new property for the avatar URL
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
    try {
      const apiUrl = 'http://localhost:8000';

      const response = await axios.post(`${apiUrl}/api/users/signup`, formData, {
        headers: {
          'Content-Type': 'application/json', // Update content type
        },
      });

      setSuccessMessage('User registered successfully!');
      router.push('/login');
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return { formData, successMessage, error, handleChange, handleSubmit };
};

export default useSignup;
