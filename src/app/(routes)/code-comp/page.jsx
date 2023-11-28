"use client"
// CreateCodeComponentForm.js
import Container from '@/components/homeLayout/Container';
import Message from '@/components/comLayout/create-code-comp/Message';
import CreateCompForm from '@/components/comLayout/create-code-comp/CreateCompForm';
import useCreateForm from '@/hooks/useCreateForm';

const CreateCodeComponentForm = () => {
    const apiUrl = 'http://localhost:8000/api/code-components/'; // Replace with your actual API URL

    const initialFormData = {
        title: '',
        description: '',
        code: '<div className="flex items-center p-4 justify-center h-[50vh]">\n\t\t//code here \n</div>',
    };

    const {
        formData,
        loading,
        successMessage,
        errorMessage,
        handleInputChange,
        handleSubmit,
    } = useCreateForm(initialFormData, apiUrl);

    const handleCodeInputChange = (newCode) => {
<<<<<<< HEAD
        handleInputChange({ target: { name: 'code', value: newCode } });
=======
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
            const apiUrl = 'https://devnexus-server.onrender.com';
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
>>>>>>> e59a4bb147f6aba4932e9f1951b25755f9c30795
    };

    return (
        <Container>
            {/* Form */}
            <CreateCompForm
                formData={formData}
                codeInput={formData.code} // Pass the code input separately
                loading={loading}
                handleInputChange={handleInputChange}
                handleCodeInputChange={handleCodeInputChange}
                handleSubmit={handleSubmit}
            />

            {/* Display success and error messages with animations */}
            {successMessage && <Message type="success" message={successMessage} />}
            {errorMessage && <Message type="error" message={errorMessage} />}
        </Container>
    );
};

export default CreateCodeComponentForm;
