"use client"
// CreateCodeComponentForm.js
import Container from '@/components/homeLayout/Container';
import Message from '@/components/comLayout/create-code-comp/Message';
import CreateCompForm from '@/components/comLayout/create-code-comp/CreateCompForm';
import useCreateForm from '@/hooks/useCreateForm';
import { useState } from 'react';
import { IoMdAlert, IoMdCard, IoMdCreate, IoMdRadioButtonOn } from 'react-icons/io';
import { FaSpinner, FaWpforms } from 'react-icons/fa';
import Popup from '@/components/comLayout/create-code-comp/popup-window/Popup';
import PopupButton from '@/components/comLayout/create-code-comp/popup-window/PopupButton';

// Define an array of button objects
const popupButtons = [
    { label: 'Loader', icon: <FaSpinner className='animate-spin' />, code: '<div className="flex items-center p-4 justify-center h-[50vh]">\n\t<div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin" />\n</div>' },
    { label: 'Card', icon: <IoMdCard />, code: '<div className="flex items-center p-4 justify-center h-[50vh]">\n\t<div className="flex items-center justify-center p-4 bg-gray-100 rounded-md shadow-md h-1/2">\n\t<p className="text-center">This is a simple card layout</p>\n</div>\n</div>' },
    { label: 'Button', icon: <IoMdRadioButtonOn />, code: '<div className="flex items-center p-4 justify-center h-[50vh]">\n\t<button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">\n\t\tClick me\n\t</button>\n</div>' },
    { label: 'Input', icon: <IoMdCreate />, code: '<div className="flex items-center p-4 justify-center h-[50vh]">\n\t<input type="text" className="px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter text" />\n</div>' },
    { label: 'Form', icon: <FaWpforms />, code: '<div className="flex items-center p-4 justify-center h-[50vh]">\n\t<form className="w-full max-w-md">\n\t\t<div className="mb-4">\n\t\t\t<label for="username" className="block mb-2 text-sm font-bold text-gray-700">Username:</label>\n\t\t\t<input type="text" id="username" name="username" className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter your username"/>\n\t\t</div>\n\t\t<div className="mb-4">\n\t\t\t<label for="password" className="block mb-2 text-sm font-bold text-gray-700">Password:</label>\n\t\t\t<input type="password" id="password" name="password" className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter your password"/>\n\t\t</div>\n\t\t<button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Submit</button>\n\t</form>\n</div>' },
    { label: 'Toast', icon: <IoMdAlert />, code: '<div className="flex items-center p-4 justify-center h-[50vh]">\n\t<div className="p-4 transition-opacity duration-300 bg-white rounded-md shadow-md bottom-4 right-4 ">\n\t<p className="text-xl font-bold">Toast message</p>\n<button className="px-2 py-1 text-sm text-blue-500 bg-white rounded-md hover:bg-gray-200 focus:outline-none focus:ring focus:border-blue-300">Close</button>\n</div>\n</div>' },
];

const CreateCodeComponentForm = () => {
    const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL + "/api/code-components/";

    // Default initialFormData
    const defaultInitialFormData = {
        title: '',
        description: '',
        code: '<div className="flex items-center p-4 justify-center h-[50vh]">\n\t\t//code here \n</div>',
        category: '',
    };

    // State to manage the visibility of the category popup
    const [showLabelPopup, setShowLabelPopup] = useState(true);

    // State to manage the initialFormData dynamically
    const [initialFormData, setInitialFormData] = useState(defaultInitialFormData);

    const {
        formData,
        loading,
        successMessage,
        errorMessage,
        handleInputChange,
        handleSubmit,
        resetForm,
    } = useCreateForm(initialFormData, apiUrl);

    const handleCodeInputChange = (newCode) => {
        handleInputChange({ target: { name: 'code', value: newCode } });
    };

    const closeMessage = () => {
        // Include this function to close the message
        resetForm('');
    };

    const handlePopupButtonClick = (buttonCode) => {
        // Update initialFormData with the selected button's code
        const updatedInitialFormData = {
            ...defaultInitialFormData,
            code: buttonCode,
        };

        setInitialFormData(updatedInitialFormData);
        setShowLabelPopup(false);

        // Update the code in LiveEditorPreview using the handleCodeInputChange function
        handleCodeInputChange(buttonCode);
    };

    const handleClosePopup = () => {
        setShowLabelPopup(false);
    };

    return (
        <Container>
            {showLabelPopup && (
                <Popup onClose={handleClosePopup}>
                    <p className="flex justify-center mb-4 text-lg font-bold md:text-4xl">
                        What are you making?
                    </p>
                    <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                        {/* Popup buttons */}
                        {popupButtons.map(({ label, icon, code }) => (
                            <PopupButton key={label} label={label} icon={icon} code={code} onClick={handlePopupButtonClick} />
                        ))}
                    </div>
                </Popup>
            )}

            {/* Form */}
            <CreateCompForm
                formData={formData}
                codeInput={formData.code}
                loading={loading}
                handleInputChange={handleInputChange}
                handleCodeInputChange={handleCodeInputChange}
                handleSubmit={handleSubmit}

            />

            {/* Display success and error messages with animations */}
            {successMessage && <Message type="success" message={successMessage} onClose={closeMessage} />}
            {errorMessage && <Message type="error" message={errorMessage} onClose={closeMessage} />}
        </Container>
    );
};

export default CreateCodeComponentForm;
