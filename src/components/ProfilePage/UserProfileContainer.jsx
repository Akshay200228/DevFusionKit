"use client"
// UserProfileContainer.jsx
import axios from 'axios';

import CodeComponent from './ProfileCodeComp/CodeComponent';
import WebTemplate from './ProfileWebTemp/WebTemplate';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import Button from '../homeLayout/Button';
import { UserProfileAvatarSkeleton, UserProfileSkeleton } from '../SkeltonLoading';
import { useEffect, useState } from 'react';
import getCookie from '@/hooks/getCookie';
import useAvatarUpload from '@/hooks/useAvatarUpload';


const UserProfileContainer = ({ user, userData, codeComponentsData, webTemplatesData }) => {
    const [avatarFile, setAvatarFile] = useState(null);
    // const [cloudinaryUrl, setCloudinaryUrl] = useCloudinaryUrl('userAvatar');
    const [cloudinaryUrl, setCloudinaryUrl] = useState(localStorage.getItem('userAvatar') || null);
    const [isUploading, setIsUploading] = useState(false);


    useEffect(() => {
        // If user uploads a new avatar, update the local storage
        if (cloudinaryUrl) {
            localStorage.setItem('userAvatar', cloudinaryUrl);
        }
    }, [cloudinaryUrl]);


    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatarFile(file);
    };

    const handleAvatarUpload = async () => {
        const token = getCookie('token')
        try {
            if (!avatarFile) {
                // No file selected
                return;
            }
            setIsUploading(true);
            const formData = new FormData();
            formData.append('file', avatarFile);
            formData.append('upload_preset', 'devNexus');

            // Make an API call to Cloudinary to upload the image
            const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/dwiwwev8p/image/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!cloudinaryResponse.ok) {
                throw new Error('Failed to upload image to Cloudinary');
            }

            // Handle the response (update UI, show success message, etc.)
            const cloudinaryData = await cloudinaryResponse.json()
            console.log('Avatar upload response:', cloudinaryData.secure_url);
            setCloudinaryUrl(cloudinaryData.secure_url);
            // window.location.reload(true);
        } catch (error) {
            console.error('Avatar upload error:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const token = getCookie('token');
    // Use the custom hook to upload Cloudinary URL to the server
    const serverUploadStatus = useAvatarUpload(token, cloudinaryUrl);
    console.log('Server upload status:', serverUploadStatus);

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
                {isUploading ? (
                    <UserProfileAvatarSkeleton />
                ) : (
                    <div className="relative w-40 h-40 mx-auto mb-4 overflow-hidden border-4 border-blue-500 rounded-full">
                        <img
                            src={cloudinaryUrl || "https://dev-nexus.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FdevLogo.8d21b413.png&w=640&q=75"}
                            alt={user.name}
                            className="object-cover w-full h-full rounded-full"
                        />
                    </div>
                )}
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
            {/* Avatar Upload Section */}
            <div className="w-full mb-4 md:w-2/3 lg:w-3/4 xl:w-4/5">
                <h2 className="mb-4 text-2xl font-semibold">Avatar Upload</h2>
                <div className="flex items-center space-x-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="flex-shrink-0 w-24 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button
                        variant="blueOutline"
                        color="outline"
                        onClick={handleAvatarUpload}
                        className="font-bold hover:bg-blue-100 active:bg-blue-400"
                    >
                        Upload Avatar
                    </Button>
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
        </div>
    );
};

export default UserProfileContainer;
