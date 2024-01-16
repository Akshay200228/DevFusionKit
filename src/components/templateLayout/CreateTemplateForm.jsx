"use client"
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';

const CreateTemplateForm = ({ formData, loading, handleInputChange, handleSubmit }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleInputChange({ target: { name: 'templateImage', value: file } });
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="flex flex-col max-w-full p-6 mx-auto mt-4 bg-white rounded-lg shadow-lg md:flex-row"
        >
            {/* Image Upload Section */}
            <div className="flex items-center justify-center w-full mb-4 md:w-1/2 md:mr-4">
                {/* Image preview */}
                {formData.templateImage && (
                    <div className="mb-4">
                        <img
                            src={URL.createObjectURL(formData.templateImage)}
                            alt="Template Preview"
                            className="w-full h-auto border border-gray-300 rounded"
                        />
                    </div>
                )}

                {/* File input for image upload */}
                <input
                    type="file"
                    id="templateImage"
                    name="templateImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {/* Creative styles for the "Upload Image" label */}
                {!formData.templateImage && (
                    <label
                        htmlFor="templateImage"
                        className="flex items-center justify-center w-full px-4 py-2 text-center text-white transition duration-300 border-4 border-white border-dashed rounded-md cursor-pointer h-44 md:h-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90"
                    >
                        <span className="text-lg">Upload Image</span>
                    </label>
                )}
            </div>

            {/* Right side - Form Fields */}
            <div className="flex-grow">
                {/* Form fields */}
                {/* (Adjust the fields according to your requirements) */}
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


                <div className="mb-4">
                    <label htmlFor="githubLink" className="block text-gray-600">GitHub Link:</label>
                    <input
                        type="text"
                        id="githubLink"
                        name="githubLink"
                        value={formData.githubLink}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="deployLink" className="block text-gray-600">Deploy Link:</label>
                    <input
                        type="text"
                        id="deployLink"
                        name="deployLink"
                        value={formData.deployLink}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* Submit button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="flex items-center justify-end w-auto px-6 py-3 mt-4 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                    <FiSend className="ml-2" />
                </motion.button>
            </div>
        </motion.form>
    );
};

export default CreateTemplateForm;
