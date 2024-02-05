// UserProfileAvatar.js
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { MdCloudUpload } from 'react-icons/md';

const UserProfileAvatar = ({
    user,
    isImageModalOpen,
    closeImageModal,
    openImageModal,
    modalImageUrl,
    handleAvatarChange,
    toggleDropdown,
    isAvatarLoading,
    isDropdownOpen,
    handleDelete,
    cloudinaryUrl
}) => {
    const defaultAvatar = 'https://dev-nexus.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FdevLogo.8d21b413.png&w=640&q=75';

    return (
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
    );
};

export default UserProfileAvatar;
