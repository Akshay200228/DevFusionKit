"use client"
// UserProfileContainer.jsx
import axios from 'axios';
import { AnimatePresence, motion } from "framer-motion";
import CodeComponent from './ProfileCodeComp/CodeComponent';
import WebTemplate from './ProfileWebTemp/WebTemplate';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import Button from '../homeLayout/Button';
import { UserProfileAvatarSkeleton, UserProfileSkeleton } from '../SkeltonLoading';
import { useState } from 'react';
import getCookie from '@/hooks/getCookie';
import useAvatarUpload from '@/hooks/useAvatarUpload';
import { RiDeleteBinLine } from "react-icons/ri";
import CustomModal from './CustomModal';
import { MdCloudUpload } from "react-icons/md";
import { FaEdit, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import Link from 'next/link';


const UserProfileContainer = ({ user, userData, codeComponentsData, webTemplatesData }) => {
    const [avatarFile, setAvatarFile] = useState(null);
    const [cloudinaryUrl, setCloudinaryUrl] = useState(localStorage.getItem('userAvatar') || null);
    const [isAvatarLoading, setIsAvatarLoading] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState('');
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const openImageModal = (imageUrl) => {
        setModalImageUrl(imageUrl);
        setIsImageModalOpen(true);
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
        setModalImageUrl('');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // const apiUrl = "https://devnexus-server.onrender.com"
    const token = getCookie('token');
    const defaultAvatar = "https://dev-nexus.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FdevLogo.8d21b413.png&w=640&q=75";

    // Function to delete the previous avatar
    const deletePreviousAvatar = async (previousImageUrl) => {
        try {
            // const response = await axios.delete(`${apiUrl}/api/users/delete-avatar`, {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_NEXUS_URL}/api/users/delete-avatar`, {
                params: { avatarUrl: previousImageUrl },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status !== 200) {
                throw new Error(response.data.error || 'Failed to delete previous avatar image.');
            }
        } catch (error) {
            console.error('Error deleting previous avatar:', error.message);
        }
    };

    const handleAvatarChange = async (e) => {
        try {
            const file = e.target.files[0];
            setAvatarFile(file);

            if (!file) {
                // No file selected
                return;
            }

            setIsAvatarLoading(true);

            // Get the previous avatar URL from local storage
            const previousImageUrl = localStorage.getItem('userAvatar');

            // Delete the previous image if previousImageUrl is present
            if (previousImageUrl) {
                // Pass the token to deletePreviousAvatar
                await deletePreviousAvatar(previousImageUrl, token);
            }


            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'devNexus');


            const cloudinaryResponse = await axios.post('https://api.cloudinary.com/v1_1/dwiwwev8p/image/upload', formData);

            if (!cloudinaryResponse.data.secure_url) {
                throw new Error('Failed to upload image to Cloudinary');
            }

            // Handle the response (update UI, show success message, etc.)
            const cloudinaryData = cloudinaryResponse.data;
            setCloudinaryUrl(() => {
                localStorage.setItem('userAvatar', cloudinaryData.secure_url);
                return cloudinaryData.secure_url;
            });

        } catch (error) {
            console.error('Avatar upload error:', error);
        } finally {
            setIsAvatarLoading(false);
            setIsDropdownOpen(false);
        }
    };

    // Use the custom hook to upload Cloudinary URL to the server
    const serverUploadStatus = useAvatarUpload(token, cloudinaryUrl);

    const handleDelete = () => {
        // Display confirmation dialog
        setConfirmDelete({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this code component?',
        });
    };

    // Delete current avatar
    const currentDeleteAvatar = async () => {
        try {
            const userAvatar = user.avatar;
            setIsAvatarLoading(true)
            const currentImageUrl = userAvatar || cloudinaryUrl;
            if (currentImageUrl) {
                await deletePreviousAvatar(currentImageUrl, token);
                localStorage.removeItem('userAvatar');
                setCloudinaryUrl(null);
                console.log('Avatar deleted successfully.');
            } else {
                console.log('No avatar to delete.');
            }
        } catch (error) {
            console.error('Error deleting avatar:', error.message);
        } finally {
            setIsAvatarLoading(false);
            setIsDropdownOpen(false);
        }
    };

    // Static data for location, followers, and social media links
    const location = "Mumbai, India";
    const followers = 5000;
    const socialMediaLinks = {
        twitter: "https://twitter.com/your_twitter",
        github: "https://github.com/your_github",
        linkedin: "https://linkedin.com/in/your_linkedin",
    };

    const contributionsData = [
        { date: '2023-01-01', count: 50 },
        { date: '2023-01-02', count: 1 },
        { date: '2023-01-02', count: 1 },
        { date: '2023-01-03', count: 22 },
        { date: '2023-01-04', count: 12 },
        { date: '2023-02-05', count: 65 },
        { date: '2023-03-05', count: 58 },
        { date: '2023-04-05', count: 11 },
        // Add more contribution data as needed
    ];
    const classForValue = (value) => {

        if (!value) {
            return 'color-empty';
        }

        const count = value.count;

        if (count > 15) {
            return 'color-github-4';
        } else if (count > 10) {
            return 'color-github-3';
        } else if (count > 5) {
            return 'color-github-2';
        } else if (count > 0) {
            return 'color-github-1';
        } else {
            return 'color-github-0';
        }
    };

    return (
        <div className="container flex flex-col p-4 mx-auto mt-8 md:flex-row">
            {/* Left Column - User Info */}
            <div className="flex-shrink-0 w-full mb-4 md:w-1/3 lg:w-1/4 xl:w-1/5 md:pr-8 md:mb-0">
                {/* Updated image styling */}
                <div className="relative mx-auto mb-4 overflow-visible border-4 border-blue-500 rounded-full w-44 h-44 xl:w-56 xl:h-56">
                    {isAvatarLoading ? (
                        <UserProfileAvatarSkeleton />
                    ) : (
                        <>
                            <img
                                src={cloudinaryUrl || user.avatar || defaultAvatar}
                                alt={user.name}
                                className="object-cover w-full h-full p-1 rounded-full"
                                onClick={() => openImageModal(cloudinaryUrl || user.avatar || defaultAvatar)}
                            />
                            {isImageModalOpen && (
                                <div className="bg-slate-700 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center h-[70vh] w-96">
                                    <div className="absolute z-30 top-2 right-2">
                                        <button
                                            onClick={closeImageModal}
                                            className="p-2 text-white bg-blue-500 rounded-full hover:text-gray-300 focus:outline-none"
                                        >
                                            <IoClose className="text-2xl" />
                                        </button>
                                    </div>
                                    <img
                                        src={modalImageUrl}
                                        alt="Avatar"
                                        className="w-full h-full rounded-lg cursor-pointer"
                                        onClick={closeImageModal}
                                    />
                                </div>
                            )}

                            {/* Edit button with dropdown */}
                            <div className="absolute bottom-0 right-0 flex items-center">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center px-2 py-1 text-white bg-blue-500 border-2 border-blue-200 rounded-xl"
                                    onClick={toggleDropdown}
                                >
                                    <FaEdit className="mr-2" />
                                    Edit
                                </button>
                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.5 }}
                                            className="absolute right-0 z-10 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-52 top-12"
                                        >
                                            <label htmlFor="avatarUpload"
                                                className="flex items-center w-full px-4 py-2 text-left text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                                                role="menuitem">
                                                <MdCloudUpload
                                                    className="w-6 h-6 mr-2 text-blue-500"
                                                />
                                                Upload avatar
                                                <input
                                                    id="avatarUpload"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleAvatarChange}
                                                    className="hidden"
                                                />
                                            </label>
                                            {/* Delete current avatar button here */}
                                            <motion.button
                                                initial={{ scale: 0.8 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                                className={`flex items-center w-full px-4 py-2 text-left ${!user.avatar ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer text-red-600 hover:text-red-800 hover:bg-red-100'}`}
                                                role="menuitem"
                                                onClick={handleDelete}
                                                disabled={isAvatarLoading || !user.avatar}
                                            >
                                                <RiDeleteBinLine
                                                    className="w-6 h-6 mr-2"
                                                    disabled={isAvatarLoading}
                                                />
                                                Remove Avatar
                                            </motion.button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </>
                    )}
                </div>

                <h1 className="mb-2 text-2xl font-semibold text-center md:text-left">{user.name}</h1>
                <p className="mb-2 text-center text-gray-600 md:text-left">{user.username}</p>
                <Button variant="blueOutline" color="outline" href="#" className="w-full my-4 font-bold hover:bg-blue-100 active:bg-blue-400">
                    Edit Profile
                </Button>

                <p className="mb-2 text-center text-gray-600 md:text-left">{user.email}</p>
                {/* Additional user details */}
                <p className="mb-2 text-center text-gray-600 md:text-left">{location}</p>
                <p className="mb-2 text-center text-gray-600 md:text-left">{followers} followers</p>

                {/* Social media links */}
                <div className="flex justify-center space-x-4 md:justify-start">
                    <Link href={socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="text-2xl" />
                    </Link>
                    <Link href={socialMediaLinks.github} target="_blank" rel="noopener noreferrer">
                        <FaGithub className="text-2xl" />
                    </Link>
                    <Link href={socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="text-2xl" />
                    </Link>
                </div>
            </div>
            {/* Right Column - User Works */}
            <div className="w-full md:w-3/4">
                {/* Display additional user data from the second API request */}
                {!userData ? (
                    <UserProfileSkeleton />
                ) : (
                    <div>
                        <CodeComponent codeComponents={codeComponentsData} />
                        {/* Adding horizontal line here */}
                        <hr className="my-8 border-t border-gray-300" />
                        <WebTemplate webTemplates={webTemplatesData} />
                    </div>
                )}

                {/* Contribution heatmap */}
                <div className="mt-8">
                    <h3 className="mb-4 text-2xl font-semibold">Contribution Heatmap</h3>
                    <CalendarHeatmap
                        startDate={new Date('2023-01-01')}
                        endDate={new Date()} // Use the current date or another end date as needed
                        values={contributionsData}
                        classForValue={classForValue}
                    />
                </div>
            </div>
            {confirmDelete && (
                <CustomModal
                    title={confirmDelete.title}
                    message={confirmDelete.message}
                    onConfirm={currentDeleteAvatar}
                    onCancel={() => setConfirmDelete(null)}
                />
            )}
        </div>
    );
};

export default UserProfileContainer;
