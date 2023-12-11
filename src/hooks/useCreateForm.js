import { useState, useEffect } from 'react';
import axios from 'axios';
import getCookie from './getCookie';

const useCreateForm = (initialFormData, apiUrl) => {
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let successTimer;
        let errorTimer;

        // Clear success message after 3 seconds
        if (successMessage) {
            successTimer = setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        }

        // Clear error message after 3 seconds
        if (errorMessage) {
            errorTimer = setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }

        // Cleanup timers on unmount
        return () => {
            clearTimeout(successTimer);
            clearTimeout(errorTimer);
        };
    }, [successMessage, errorMessage]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormData(initialFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true); // Show loading

        try {
            const token = getCookie('token');

            const response = await axios.post(apiUrl, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Item created: ', response.data);

            // Handle success response
            setSuccessMessage('Item created successfully!');
            setErrorMessage('');

            // Reset the form after a successful submission
            resetForm();
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage('Error creating item: ' + error.message);
        } finally {
            setLoading(false); // Hide loading
        }
    };

    return {
        formData,
        loading,
        successMessage,
        errorMessage,
        handleInputChange,
        handleSubmit,
        resetForm,
    };
};

export default useCreateForm;