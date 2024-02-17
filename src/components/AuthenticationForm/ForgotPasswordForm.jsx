'use client';
// ForgotPassword.jsx
import { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaEye, FaEyeSlash, FaKey, FaPaperPlane } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;
    
    const handleForgotPassword = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/users/forgot-password`, { email });
            setMessage(response.data.message);
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    const handleResetPassword = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/users/reset-password`, { email, otp, newPassword });
            setMessage(response.data.message);
            setTimeout(() => {
                setMessage('');
                router.replace('/login');
            }, 2000);
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    // Function to toggle show/hide password
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    return (
        <div className="z-10 w-full max-w-md p-6 mx-2 bg-white border-t-4 border-blue-600 rounded-lg shadow-lg">
            <div className="flex flex-col items-center justify-center h-full">

                <h2 className="mb-8 text-3xl font-bold text-blue-500">Forgot Password</h2>
                {message && <p className="mb-4 text-green-500">{message}</p>}
                {error && <p className="mb-4 text-red-500">{error}</p>}
                <div className="w-full max-w-md mb-8">
                    <div className="flex items-center py-2 border-b border-gray-300">
                        <FaEnvelope className="mr-4 text-gray-400" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-2 py-1 text-gray-800 focus:outline-none"
                            placeholder="Enter your email"
                        />
                    </div>
                </div>
                <button
                    onClick={handleForgotPassword}
                    className="flex items-center justify-center w-full max-w-xs px-6 py-3 mb-8 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    Send OTP <FaPaperPlane className="ml-2" />
                </button>
                <div className="w-full max-w-md mb-8">
                    <div className="flex items-center py-2 border-b border-gray-300">
                        <FaKey className="mr-4 text-gray-400" />
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full px-2 py-1 text-gray-800 focus:outline-none"
                            placeholder="Enter OTP"
                        />
                    </div>
                </div>
                <div className="w-full max-w-md mb-8">
                    <div className="relative flex items-center py-2 border-b border-gray-300">
                        <FaKey className="mr-4 text-gray-400" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-2 py-1 text-gray-800 focus:outline-none"
                            placeholder="Enter new password"
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
                    onClick={handleResetPassword}
                    className="flex items-center justify-center w-full max-w-xs px-6 py-3 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    Reset Password <FaPaperPlane className="ml-2" />
                </button>
            </div>
        </div>
    );
}

export default ForgotPasswordForm;
