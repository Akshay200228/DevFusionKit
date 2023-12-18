"use client"
// EditWebTemplate.jsx
import axios from 'axios';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaCheck, FaSpinner, FaTimes } from 'react-icons/fa';
import getCookie from '@/hooks/getCookie';

const EditWebTemplate = ({ template, onCancelEdit }) => {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: template.title,
        description: template.description,
        githubLink: template.githubLink,
        deployLink: template.deployLink,
        templateImage: template.templateImage,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const token = getCookie('token');
    const handleUpdate = async () => {
        try {
            setLoading(true);
            // const apiUrl = "http://localhost:8000";
            const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;

            const response = await axios.put(
                `${apiUrl}/api/web-templates/update/${template._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('Web template updated successfully:', response.data);
            onCancelEdit();
        } catch (error) {
            console.error('Error updating web template:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleUpdate}
            className="w-auto p-6 mx-auto mt-4 bg-white rounded-lg shadow-lg"
        >
            {/* Title */}
            <div className="mb-4">
                <label htmlFor="title" className="block mb-2 text-sm font-bold text-gray-700">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>

            {/* Description */}
            <div className="mb-4">
                <label htmlFor="description" className="block mb-2 text-sm font-bold text-gray-700">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>

            {/* githubLink */}
            <div className="mb-4">
                <label htmlFor="description" className="block mb-2 text-sm font-bold text-gray-700">
                    GithubLink
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.githubLink}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>

            {/* deployLink */}
            <div className="mb-4">
                <label htmlFor="description" className="block mb-2 text-sm font-bold text-gray-700">
                    DeployLink
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.deployLink}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>

            {/* templateImage */}
            <div className="mb-4">
                <label htmlFor="description" className="block mb-2 text-sm font-bold text-gray-700">
                    TemplateImage
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.templateImage}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>

            <div className="flex justify-between mt-4">
                <button
                    type="submit"
                    className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {loading ? (
                        <>
                            <FaSpinner className="mr-2 animate-spin" />
                            Updating...
                        </>
                    ) : (
                        <>
                            <FaCheck className="mr-2" />
                            Update
                        </>
                    )}
                </button>
                <button
                    type="button"
                    onClick={onCancelEdit}
                    className="flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    <FaTimes className="mr-2" />
                    Cancel
                </button>
            </div>
        </motion.form>
    );
};

export default EditWebTemplate;
