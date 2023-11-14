"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@/components/homeLayout/Container';
import getCookie from '@/context/getCookie';
import Message from '@/components/comLayout/create-code-comp/Message';
import CreateCompForm from '@/components/comLayout/create-code-comp/CreateCompForm';
import { useRouter } from 'next/navigation';

const CreateCodeComponentForm = () => {
    const initialFormData = {
        title: '',
        description: '',
        code: '<div className="flex items-center p-4 justify-center h-[50vh]">\n\t\t//code here \n</div>',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [codeInput, setCodeInput] = useState(initialFormData.code);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter();


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

    const handleCodeInputChange = (newCode) => {
        setCodeInput(newCode);
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setCodeInput(initialFormData.code);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the "title" and "description" fields
        if (!formData.title.trim() || !formData.description.trim()) {
            setSuccessMessage('');
            setErrorMessage('Title and description are required fields.');
            return;
        }

        setLoading(true); // Show loading

        try {
            const token = getCookie('token');
            const updatedFormData = { ...formData, code: codeInput };
            const apiUrl = process.env.NEXT_PUBLIC || 'https://devnexus-server.onrender.com';
            const response = await axios.post(`${apiUrl}/api/code-components/`, updatedFormData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Code component created: ', response.data);

            // Extract the ID of the newly created code component
            const newCodeComponentId = response.data._id;

            console.log('Code comp id',newCodeComponentId)

            setSuccessMessage('Code component created successfully!');
            setErrorMessage(''); // Clear any previous error messages

            // Reset the form after a successful submission
            resetForm();
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage('Error creating code component: ' + error.message);
        } finally {
            setLoading(false); // Hide loading
        }
    };

    return (
        // <div className="w-full h-auto overflow-y-hidden bg-white">
        <Container>
            {/* Form */}
            <CreateCompForm
                formData={formData}
                codeInput={codeInput}
                loading={loading}
                handleInputChange={handleInputChange}
                handleCodeInputChange={handleCodeInputChange}
                handleSubmit={handleSubmit}
            />

            {/* Display success and error messages with animations */}

            {successMessage && <Message type="success" message={successMessage} />}
            {errorMessage && <Message type="error" message={errorMessage} />}

        </Container>
        // </div>
    );
};

export default CreateCodeComponentForm;
