"use client"
import Container from '@/components/homeLayout/Container';
import Message from '@/components/comLayout/create-code-comp/Message';
import CreateTemplateForm from '@/components/templateLayout/CreateTemplateForm';
import useCreateForm from '@/hooks/useCreateForm';
import { useState } from 'react';

const TemplateForm = () => {
    // State to store success and error messages
    const [currentSuccessMessage, setCurrentSuccessMessage] = useState(null);
    const [currentErrorMessage, setCurrentErrorMessage] = useState(null);
    const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL+"/api/web-templates/";
    const initialFormData = {
        title: '',
        description: '',
        templateImage: '',
        githubLink: '',
        deployLink: '',
    };

    const {
        formData,
        loading,
        successMessage,
        errorMessage,
        handleInputChange,
        handleSubmit,
    } = useCreateForm(initialFormData, apiUrl);

    return (
        <Container className="h-screen">
            {/* Form */}
            <CreateTemplateForm
                formData={formData}
                loading={loading}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />

            {/* Display success and error messages with animations  */}
            {currentSuccessMessage && (
                <Message type="success" message={successMessage} onClose={() => setCurrentSuccessMessage(null)} />
            )}
            {currentErrorMessage && (
                <Message type="error" message={errorMessage} onClose={() => setCurrentErrorMessage(null)} />
            )}
        </Container>
    );
};

export default TemplateForm;
