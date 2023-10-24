"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@/components/homeLayout/Container';
import Button from '@/components/homeLayout/Button';
import getCookie from '@/context/getCookie';
import LiveEditorPreview from '@/components/comLayout/create-code-comp/LiveEditorPreview';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

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

            const response = await axios.post(`http://localhost:8000/api/code-components/`, updatedFormData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Code component created: ', response.data);

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
        <Container>
            <form onSubmit={handleSubmit} className="max-w-full mx-auto mt-4">
                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2 text-sm font-bold text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2 text-sm font-bold text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>

                {/* Use the LiveEditorPreview component here */}
                <LiveEditorPreview Input={codeInput} handleChange={handleCodeInputChange} />

                <Button type="submit" className="mt-4" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </Button>
            </form>

            {/* Display success and error messages in the bottom-right corner */}
            {successMessage && (
                <div className="fixed z-10 flex items-center px-4 py-3 text-green-800 bg-green-100 rounded bottom-4 right-4">
                    <FiCheckCircle className="mr-2 text-xl text-green-600" />
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className="fixed z-10 flex items-center px-4 py-3 text-red-800 bg-red-100 rounded bottom-4 right-4">
                    <FiAlertCircle className="mr-2 text-xl text-red-600" />
                    {errorMessage}
                </div>
            )}

        </Container>
    );
};

export default CreateCodeComponentForm;
