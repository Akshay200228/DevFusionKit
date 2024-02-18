'use client';
// ForgotPassword.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEnvelope, FaEye, FaEyeSlash, FaKey, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [expirationTimer, setExpirationTimer] = useState(60);
    const router = useRouter();

    const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;

    const handleForgotPassword = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${apiUrl}/api/users/forgot-password`, { email });
            setMessage(response.data.message);
            startExpirationTimer(); // Start the expiration timer after OTP is sent
        } catch (error) {
            setError(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${apiUrl}/api/users/reset-password`, { email, otp, newPassword });
            setMessage(response.data.message);
            router.replace('/login');
        } catch (error) {
            setError(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        try {
            setLoading(true);
            await axios.post(`${apiUrl}/api/users/resend-otp`, { email });
            setMessage('OTP Resent');
            startExpirationTimer(); // Restart the expiration timer after resending OTP
        } catch (error) {
            setError(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    // Function to toggle show/hide password
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Function to start the expiration timer
    const startExpirationTimer = () => {
        setResendDisabled(true); // Disable the "Resend OTP" button
        setExpirationTimer(120); // Reset the timer to 120 seconds (2 minutes)
        const timer = setInterval(() => {
            setExpirationTimer((prevTimer) => prevTimer - 1); // Decrement timer every second
        }, 1000);
        setTimeout(() => {
            clearInterval(timer); // Clear the timer after 120 seconds
            setResendDisabled(false); // Enable the "Resend OTP" button
        }, 120000); // 120,000 milliseconds = 120 seconds = 2 minutes
    };

    // Format the expiration timer display
    const formattedTimer = `${Math.floor(expirationTimer / 60)
        .toString()
        .padStart(2, '0')}:${(expirationTimer % 60).toString().padStart(2, '0')}`;

    useEffect(() => {
        if (expirationTimer === 0) {
            setResendDisabled(false); // Enable the "Resend OTP" button when timer reaches 0
        }
    }, [expirationTimer]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
            setMessage('');
        }, 3000);
        return () => clearTimeout(timer);
    }, [error, message]);

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
                    className={`flex items-center justify-center w-full max-w-xs px-6 py-3 mb-4 transition duration-300 rounded-md ${loading || resendDisabled ? 'bg-gray-300 cursor-not-allowed text-slate-800' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                    disabled={loading || resendDisabled}
                >
                    {loading ? <FaSpinner className="mr-2 animate-spin" /> : null}
                    Send OTP <FaPaperPlane className="ml-2" />
                </button>
                <div className="w-full max-w-md mb-4">
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
                <div className="w-full max-w-md mb-4">
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
                    className={`flex items-center justify-center w-full max-w-xs px-6 py-3 mb-4 transition duration-300 rounded-md ${
                        loading ? 'bg-gray-300 cursor-not-allowed text-slate-800' : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                    disabled={loading}
                >
                    {loading ? <FaSpinner className="mr-2 animate-spin" /> : null}
                    Reset Password <FaPaperPlane className="ml-2" />
                </button>
                <div className="flex items-center justify-center">
                    <button
                        onClick={handleResendOTP}
                        className={`flex items-center px-3 py-2 text-sm rounded-md ${
                            resendDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500 hover:text-blue-600'
                        }`}
                        disabled={resendDisabled}
                    >
                        Resend OTP
                    </button>
                    {resendDisabled && <span className="ml-2 text-gray-400">{formattedTimer}</span>}
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordForm;
