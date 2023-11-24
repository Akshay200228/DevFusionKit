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
    });
    const [avatar, setAvatar] = useState(null);
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

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = 'http://localhost:8000';

            const formDataWithAvatar = new FormData();
            Object.keys(formData).forEach((key) => {
                formDataWithAvatar.append(key, formData[key]);
            });

            if (avatar) {
                formDataWithAvatar.append('avatar', avatar);
            }

            const response = await axios.post(`${apiUrl}/api/users/signup`, formDataWithAvatar, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccessMessage('User registered successfully!');
            router.push('/login');
        } catch (error) {
            console.error(error);
            setError(error);
        }
    };

    return { formData, avatar, successMessage, error, handleChange, handleAvatarChange, handleSubmit };
};

export default useSignup;
