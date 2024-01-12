"use client"
// CreateCodeComponentForm.js
import Container from '@/components/homeLayout/Container';
import Message from '@/components/comLayout/create-code-comp/Message';
import CreateCompForm from '@/components/comLayout/create-code-comp/CreateCompForm';
import useCreateForm from '@/hooks/useCreateForm';
import { useState } from 'react';
import { HiX } from 'react-icons/hi';
import { IoMdAlert, IoMdCard, IoMdCheckboxOutline, IoMdCreate, IoMdRadioButtonOn, IoMdRefresh } from 'react-icons/io';
import { FaSpinner } from 'react-icons/fa';

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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-4 mx-2 my-4 bg-white rounded-md shadow-md md:my-0 md:p-8 md:mx-4 overflow-y-auto max-h-[80vh]">
                    {/* <div className="p-4 mx-2 my-4 w-4/5 md:w-auto bg-white rounded-md shadow-md md:my-0 md:p-8 md:mx-4 overflow-y-auto max-h-[80vh]"> */}
                        <div className="flex justify-end mb-4">
                            {/* <p className="mb-2 text-lg font-semibold">Select a category</p> */}

                            <button
                                onClick={handleClosePopup}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                <HiX className="text-2xl" />
                            </button>
                        </div>
                        <p className="flex justify-center mb-4 text-lg font-bold md:text-4xl">
                            What are you making?
                        </p>
                        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-3">
                            {/* Popup buttons */}
                            {[
                                { label: 'Loader', icon: <FaSpinner className='animate-spin' />, code: '<div className="flex items-center p-4 justify-center h-[50vh]">\n\t<div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin" />\n</div>' },
                                { label: 'Card', icon: <IoMdCard />, code: '<div className="flex items-center p-4 justify-center h-[50vh]">\n\t<div className="flex items-center justify-center p-4 bg-gray-100 rounded-md shadow-md h-1/2">\n\t<p className="text-center">This is a simple card layout</p>\n</div>\n</div>' },
                                { label: 'Button', icon: <IoMdRadioButtonOn />, code: '<div className="flex items-center p-4 justify-center h-[50vh]">\n\t<button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">\n\t\tClick me\n\t</button>\n</div>' },
                                { label: 'Input', icon: <IoMdCreate />, code: '<div className="flex items-center p-4 justify-center h-[50vh]">\n\t<input type="text" className="px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter text" />\n</div>' },
                                { label: 'Form', icon: <IoMdCheckboxOutline />, code: '<div className="flex items-center p-4 justify-center h-[50vh]">\n\t<form className="w-full max-w-md">\n\t\t<div className="mb-4">\n\t\t\t<label for="username" className="block mb-2 text-sm font-bold text-gray-700">Username:</label>\n\t\t\t<input type="text" id="username" name="username" className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter your username"/>\n\t\t</div>\n\t\t<div className="mb-4">\n\t\t\t<label for="password" className="block mb-2 text-sm font-bold text-gray-700">Password:</label>\n\t\t\t<input type="password" id="password" name="password" className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter your password"/>\n\t\t</div>\n\t\t<button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Submit</button>\n\t</form>\n</div>' },
                                { label: 'Toast', icon: <IoMdAlert />, code: '<div className="flex items-center p-4 justify-center h-[50vh]">\n\t<div className="p-4 transition-opacity duration-300 bg-white rounded-md shadow-md bottom-4 right-4 ">\n\t<p className="text-xl font-bold">Toast message</p>\n<button className="px-2 py-1 text-sm text-blue-500 bg-white rounded-md hover:bg-gray-200 focus:outline-none focus:ring focus:border-blue-300">Close</button>\n</div>\n</div>' },
                            ].map(({ label, icon, code }) => (
                                <button
                                    key={label}
                                    onClick={() => handlePopupButtonClick(code)}
                                    className="flex flex-col items-center justify-center w-48 h-auto gap-2 px-4 py-2 text-white transition duration-300 ease-in-out transform bg-blue-500 rounded-md md:py-4 hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    <span className='text-3xl'>{icon}</span>
                                    <span className="text-lg font-semibold">{label}</span>
                                    <div className="flex items-center mt-2 space-x-2">
                                        <span className="px-2 py-1 text-xs tracking-wider text-gray-800 uppercase bg-yellow-500 rounded-md">New</span>
                                        <span className="px-2 py-1 text-xs tracking-wider text-gray-800 uppercase bg-green-500 rounded-md">Hot</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
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
