"use client"
// UserProfileContainer.jsx
import axios from 'axios';
import CodeComponent from './ProfileCodeComp/CodeComponent';
import WebTemplate from './ProfileWebTemp/WebTemplate';
import { UserProfileAvatarSkeleton, UserProfileSkeleton } from '../SkeltonLoading';
import { useState } from 'react';
import getCookie from '@/hooks/getCookie';
import useAvatarUpload from '@/hooks/useAvatarUpload';
import CustomModal from './CustomModal';
import UserProfileAvatar from './AuthUser/UserProfileAvatar';
import AuthUserInfo from './AuthUser/AuthUserInfo';


const UserProfileContainer = ({ user, userData, codeComponentsData, webTemplatesData, followerCount, followingCount }) => {
    const [avatarFile, setAvatarFile] = useState(null);
    const [cloudinaryUrl, setCloudinaryUrl] = useState(localStorage.getItem('userAvatar') || null);
    const [isAvatarLoading, setIsAvatarLoading] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState('');
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(user);

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleUpdateSuccess = (updatedUserData) => {
        setCurrentUser((prevUser) => ({
            ...prevUser,
            ...updatedUserData,
        }));
    };

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

    const token = getCookie('token');
    const defaultAvatar = "https://dev-nexus.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FdevLogo.8d21b413.png&w=640&q=75";

    // Function to delete the previous avatar
    const deletePreviousAvatar = async (previousImageUrl) => {
        try {
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

    return (
        <div className="container flex flex-col p-4 mx-auto mt-8 md:flex-row">
            {/* Left Column - User Info */}
            <div className="flex-shrink-0 w-full mb-4 md:w-1/3 lg:w-1/4 xl:w-1/5 md:pr-8 md:mb-0">
                {/* Updated image styling */}
                <div className="relative mx-auto mb-4 overflow-visible border-4 border-blue-500 rounded-full w-44 h-44 xl:w-56 xl:h-56">
                    {isAvatarLoading ? (
                        <UserProfileAvatarSkeleton />
                    ) : (
                        <UserProfileAvatar
                            user={user}
                            cloudinaryUrl={cloudinaryUrl}
                            isImageModalOpen={isImageModalOpen}
                            modalImageUrl={modalImageUrl}
                            isDropdownOpen={isDropdownOpen}
                            isAvatarLoading={isAvatarLoading}
                            closeImageModal={closeImageModal}
                            openImageModal={openImageModal}
                            toggleDropdown={toggleDropdown}
                            handleAvatarChange={handleAvatarChange}
                            handleDelete={handleDelete}
                        />
                    )}
                </div>

                <AuthUserInfo
                    user={user}
                    token={token}
                    currentUser={currentUser}
                    followerCount={followerCount}
                    followingCount={followingCount}
                    isEditModalOpen={isEditModalOpen}
                    openEditModal={openEditModal}
                    closeEditModal={closeEditModal}
                    handleUpdateSuccess={handleUpdateSuccess}
                />
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
