"use client"
import Container from '@/components/homeLayout/Container';
import Message from '@/components/comLayout/create-code-comp/Message';
import CreateTemplateForm from '@/components/templateLayout/CreateTemplateForm';
import useCreateForm from '@/hooks/useCreateForm';

const TemplateForm = () => {
    // const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL + "/api/code-templates/" || "http://localhost:8000/api/code-templates/";
    const apiUrl = "https://devnexus-server.onrender.com/api/code-templates/";
    
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

            {/* Display success and error messages with animations */}
            {successMessage && <Message type="success" message={successMessage} />}
            {errorMessage && <Message type="error" message={errorMessage} />}
        </Container>
    );
};

export default TemplateForm;
