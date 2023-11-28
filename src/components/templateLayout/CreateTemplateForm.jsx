"use client"
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';

const CreateTemplateForm = ({ formData, loading, handleInputChange, handleSubmit }) => {
    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="max-w-full p-6 mx-auto mt-4 bg-white rounded-lg shadow-lg"
        >
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
                <label htmlFor="templateImage" className="block text-gray-600">TemplateImage URL:</label>
                <input
                    type="text"
                    id="templateImage"
                    name="templateImage"
                    value={formData.templateImage}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
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

            {/* Additional form fields go here */}

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
        </motion.form>
    );
};

export default CreateTemplateForm;
