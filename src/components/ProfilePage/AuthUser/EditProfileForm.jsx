'use client';
// EditProfileForm.jsx
import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUser, FaLink, FaLinkedin, FaGithub, FaMapMarkerAlt, FaMap, FaCheck, FaTimes } from 'react-icons/fa';

const EditProfileForm = ({
    user,
    token,
    onClose,
    onUpdateSuccess
}) => {
    const [editProfileData, setEditProfileData] = useState({
        name: user.name,
        portfolio: user.portfolio || '',
        linkedin: user.linkedin || '',
        github: user.github || '',
        cityName: user.cityName || '',
        stateName: user.stateName || '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditProfileSubmit = async () => {
        try {
            // Make a request to update user details
            const response = await axios.put('http://localhost:8000/api/users/update', editProfileData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Handle success, e.g., close modal, show success message, etc.
            console.log('User details updated successfully:', response.data);
            onUpdateSuccess(response.data);
            onClose();
        } catch (error) {
            console.error('Error updating user details:', error.message);
            // Handle error, e.g., show error message
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-8 bg-white rounded-lg w-96"
        >
            <h2 className="flex items-center mb-4 text-2xl font-semibold">
                <FaUser className="mr-2" /> Edit Profile
            </h2>
            <label className="block mb-4">
                <span className="flex items-center">
                    <FaUser className="mr-2" />
                    Name
                </span>
                <input
                    type="text"
                    name="name"
                    value={editProfileData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />
            </label>
            <label className="block mb-4">
                <span className="flex items-center">
                    <FaLink className="mr-2" />
                    Portfolio
                </span>
                <input
                    type="text"
                    name="portfolio"
                    value={editProfileData.portfolio}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />
            </label>
            <label className="block mb-4">
                <span className="flex items-center">
                    <FaGithub className="mr-2" />
                    GitHub
                </span>
                <input
                    type="text"
                    name="github"
                    value={editProfileData.github}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />
            </label>
            <label className="block mb-4">
                <span className="flex items-center">
                    <FaLinkedin className="mr-2" />
                    LinkedIn
                </span>
                <input
                    type="text"
                    name="linkedin"
                    value={editProfileData.linkedin}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />
            </label>
            <label className="block mb-4">
                <span className="flex items-center">
                    <FaMapMarkerAlt className="mr-2" />
                    City Name
                </span>
                <input
                    type="text"
                    name="cityName"
                    value={editProfileData.cityName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />
            </label>
            <label className="block mb-4">
                <span className="flex items-center">
                    <FaMap className="mr-2" />
                    State Name
                </span>
                <input
                    type="text"
                    name="stateName"
                    value={editProfileData.stateName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />
            </label>
            <div className="flex justify-end mt-6">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEditProfileSubmit}
                    className="flex items-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    <FaCheck className="mr-2" /> Save
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="flex items-center px-4 py-2 ml-4 text-gray-600 bg-gray-300 rounded hover:bg-gray-400"
                >
                    <FaTimes className="mr-2" /> Cancel
                </motion.button>
            </div>
        </motion.div>
    );
};

export default EditProfileForm;
