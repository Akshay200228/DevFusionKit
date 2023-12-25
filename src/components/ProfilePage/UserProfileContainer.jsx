"use client"
// UserProfileContainer.jsx
import axios from 'axios';

import CodeComponent from './ProfileCodeComp/CodeComponent';
import WebTemplate from './ProfileWebTemp/WebTemplate';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import Button from '../homeLayout/Button';
import { UserProfileAvatarSkeleton, UserProfileSkeleton } from '../SkeltonLoading';
import React, { useMemo, useState } from 'react';
import getCookie from '@/hooks/getCookie';
import useAvatarUpload from '@/hooks/useAvatarUpload';
import { TbCameraUp } from 'react-icons/tb';
import { RiDeleteBinLine } from "react-icons/ri";
import CustomModal from './CustomModal';


const UserProfileContainer = ({ user, userData, codeComponentsData, webTemplatesData }) => {
    const [avatarFile, setAvatarFile] = useState(null);
    // const [cloudinaryUrl, setCloudinaryUrl] = useCloudinaryUrl('userAvatar');
    const [cloudinaryUrl, setCloudinaryUrl] = useState(localStorage.getItem('userAvatar') || null);
    const [isAvatarLoading, setIsAvatarLoading] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const apiUrl = "https://devnexus-server.onrender.com"
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

            console.log('Previous avatar deleted successfully.');
        } catch (error) {
            console.error('Error deleting previous avatar:', error.message);
        }
    };

    const handleAvatarChange = useMemo(() => async (e) => {
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
            console.log("previousImageUrl: ", previousImageUrl)

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
        }
    });

    // Use the custom hook to upload Cloudinary URL to the server
    const serverUploadStatus = useAvatarUpload(token, cloudinaryUrl);
    console.log('Server upload status:', serverUploadStatus);

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
            setIsAvatarLoading(true)
            const currentImageUrl = cloudinaryUrl;
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
            setIsAvatarLoading(false)
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
    const classForValue = useMemo(() => (value) => {

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
    });

    return (
        <div className="container flex flex-col p-4 mx-auto mt-8 md:flex-row">
            {/* Left Column - User Info */}
            <div className="flex-shrink-0 w-full mb-4 md:w-1/3 lg:w-1/4 xl:w-1/5 md:pr-8 md:mb-0">
                {/* Updated image styling */}
                <div className="relative mx-auto mb-4 overflow-visible border-4 border-blue-500 rounded-full w-44 h-44">
                    {isAvatarLoading ? (
                        <UserProfileAvatarSkeleton />
                    ) : (
                        <>
                            <img
                                src={cloudinaryUrl || user.avatar ||defaultAvatar}
                                alt={user.name}
                                className="object-cover w-full h-full p-1 rounded-full"
                            />
                            {/* Upload button here */}
                            <div className="absolute bottom-0 right-0 flex items-center">
                                <label htmlFor="avatarUpload" className="cursor-pointer">
                                    <TbCameraUp className="w-10 h-10 p-2 text-white bg-blue-500 rounded-full" />
                                </label>
                                <input
                                    id="avatarUpload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                />
                            </div>
                            {/* Delete current avatar button here */}
                            <div className="absolute bottom-0 left-0 flex items-center">
                                <RiDeleteBinLine
                                    className={`w-10 h-10 p-2 text-white rounded-full ${isAvatarLoading ? 'bg-gray-500' : 'bg-red-500'
                                        }`}
                                    style={{ cursor: isAvatarLoading ? 'not-allowed' : 'pointer' }}
                                    onClick={handleDelete}
                                />
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
                    <a href={socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer">
                        Twitter
                    </a>
                    <a href={socialMediaLinks.github} target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a href={socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
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

// Memoize the entire component to avoid unnecessary re-renders
const MemoizedUserProfileContainer = React.memo(UserProfileContainer);

export default MemoizedUserProfileContainer;
