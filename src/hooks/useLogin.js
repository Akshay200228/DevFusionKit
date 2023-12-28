// useLogin.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({
        usernameOrEmail: '',
        password: '',
        otp: '',
    });
    const [error, setError] = useState(null);
    const router = useRouter();

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
            // const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL || "http://localhost:8000";
            // const apiUrl = "https://devnexus-server.onrender.com";
            const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;


            const response = await axios.post(`${apiUrl}/api/users/login`, credentials);

            const { token } = response.data;

            const tokenExpirationDays = 7;
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + tokenExpirationDays);

            document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/`;

            router.push('/');
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, credentials, error, handleChange, handleSubmit };
};

export default useLogin;
