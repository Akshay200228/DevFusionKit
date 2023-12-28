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
    otp: '',
    expirationTime: null,
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleResendOTP = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;
      await axios.post(`${apiUrl}/api/users/resend-otp`, { email: formData.email });

      setOtpSent(true);
      setSuccessMessage('OTP resent successfully!');
      setShowOtpInput(true);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;

      // Prepare the data to be sent in the request
      const verificationData = {
        email: formData.email,
        otp: formData.otp,
      };

      // Send a request to verify the OTP
      const otpVerificationResponse = await axios.post(
        `${apiUrl}/api/users/verify-otp`,
        verificationData, // Send the data
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Check if OTP verification is successful
      if (otpVerificationResponse.status === 200) {
        setSuccessMessage('OTP verified successfully!');
        setShowOtpInput(false); // Hide OTP input after successful verification

        // Redirect to the login page after successful registration
        router.push('/login');
      } else {
        // Handle OTP verification failure (e.g., show an error message)
        console.error('OTP verification failed');
        setError({ message: 'OTP verification failed' });
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      setError(error);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword, otp } = formData;

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return setError({ message: 'Password and confirm password do not match' });
    }

    try {
      // const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL || "http://localhost:8000";
      // const apiUrl = "https://devnexus-server.onrender.com";
      const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;
      const response = await axios.post(`${apiUrl}/api/users/signup`, { ...formData, otp }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Example: Log the response to the console
      console.log('Signup Response:', response);

      setSuccessMessage('User registered successfully! Moye Moye');
      // If registration is successful, show OTP input
      setOtpSent(true);
      setShowOtpInput(true);
      // router.push('/login');
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return {
    formData,
    successMessage,
    error,
    otpSent,
    showOtpInput,
    handleChange,
    handleSubmit,
    handleVerifyOTP,
    handleResendOTP,
  };
};

export default useSignup;
