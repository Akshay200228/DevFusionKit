"use client"
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from "@/hooks/useAuth";
import { CardSkeleton } from '@/components/SkeltonLoading';
import { LivePreview, LiveProvider } from 'react-live';
import { FaCode } from 'react-icons/fa';
import { IoBookmark } from 'react-icons/io5';
import getCookie from '@/hooks/getCookie';
import { useSearch } from '@/context/SearchContext';
import UserAvatar from '@/components/UserAvatar';

const MyFavorites = () => {
    const { user, error, isLoading } = useAuth();
    const { searchQuery } = useSearch();
    const [bookmarks, setBookmarks] = useState([]);
    const [loadingBookmarks, setLoadingBookmarks] = useState(true);

    const userId = user ? user._id : null;

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;
                const bookmarksIds = user?.bookmarks.map((bookmark) => bookmark._id).join(',');

                if (bookmarksIds) {
                    const response = await axios.get(`${apiUrl}/api/code-components/ids/${bookmarksIds}`);
                    setBookmarks(response.data);
                }
            } catch (error) {
                console.error('Error fetching bookmarks:', error);
            } finally {
                setLoadingBookmarks(false);
            }
        };

        if (user?.bookmarks?.length > 0) {
            fetchBookmarks();
        } else {
            setLoadingBookmarks(false);
        }
    }, [user]);

    const handleRemoveBookmark = async (bookmarkId) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;
            const token = getCookie('token');
            const removeResponse = await fetch(`${apiUrl}/api/bookmark/remove-bookmark`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ codeComponentId: bookmarkId }),
            });

            const removeData = await removeResponse.json();

            if (removeResponse.ok) {
                console.log('Bookmark removed successfully:', removeData);
                // Update the local state to reflect the removal
                setBookmarks((prevBookmarks) => prevBookmarks.filter((bookmark) => bookmark._id !== bookmarkId));
            } else {
                console.error('Error removing bookmark:', removeData.error);
            }
        } catch (error) {
            console.error('Error removing bookmark:', error);
        }
    };

    if (isLoading) {
        return <CardSkeleton count={9} />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Filter bookmarks based on search query
    const filteredBookmarks = bookmarks.filter((bookmark) =>
        bookmark.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="grid grid-cols-1 gap-8 p-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {loadingBookmarks ? (
                <div>Loading bookmarks...</div>
            ) : (
                filteredBookmarks.length > 0 ? (
                    filteredBookmarks.map((bookmark) => (
                        <motion.div
                            key={bookmark._id}
                            initial={{ rotateY: -10, rotateX: 10 }}
                            animate={{ rotateY: 0, rotateX: 0 }}
                            whileHover={{ rotateY: 10, rotateX: 5 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            className="relative flex flex-col h-full bg-white rounded-lg shadow-xl transform-style-preserve-3d hover:shadow-2xl"
                        >
                            <LiveProvider code={bookmark.code}>
                                <div
                                    className="min-h-[50vh] mb-4 bg-gradient-to-r from-blue-300 to-blue-200 relative overflow-hidden rounded-t-lg transform-style-preserve-3d"
                                >
                                    <div className="absolute inset-0 text-neutral-950">
                                        <LivePreview />
                                    </div>
                                </div>
                            </LiveProvider>

                            <div className="flex items-center justify-between px-2 mb-4">
                                <div className="flex items-center space-x-3">
                                    {/* User Avatar */}
                                    <UserAvatar createdBy={bookmark.createdBy} creatorAvatar={bookmark.creatorAvatar} />

                                    <div>
                                        <motion.div
                                            className="text-lg font-semibold text-gray-800 md:text-2xl "
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                                        >
                                            {bookmark.title}
                                        </motion.div>
                                        <motion.p
                                            className="text-sm text-gray-600"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.1, ease: 'easeInOut' }}
                                        >
                                            Category {bookmark.category}
                                        </motion.p>
                                    </div>
                                </div>
                                {/* Remove bookmark */}
                                <motion.button
                                    onClick={() => handleRemoveBookmark(bookmark._id)}
                                    className={`absolute top-2 right-2 p-2 z-10 text-white rounded-full transition-transform duration-300 transform hover:scale-110 bg-red-500`}
                                    initial={{ opacity: 1 }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <div className="flex items-center space-x-2">
                                        <IoBookmark className="text-xl md:text-3xl" />
                                    </div>
                                </motion.button>
                                <Link href={`/component/${bookmark._id}`}>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        initial={{ scale: 1, opacity: 0.9 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="px-4 py-2 text-white transition-transform duration-300 ease-in-out rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 hover:shadow-2xl focus:outline-none focus:ring focus:border-blue-300 transform-style-preserve-3d"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <motion.div
                                                initial={{ scale: 0.8, rotateY: -10, rotateX: 10 }}
                                                animate={{ scale: 1, rotateY: 0, rotateX: 0 }}
                                                transition={{ yoyo: Infinity, duration: 1.5 }}
                                            >
                                                <FaCode className="text-xl md:text-3xl" />
                                            </motion.div>
                                            <span className="text-lg">Explore</span>
                                        </div>
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div>No bookmarks found.</div>
                )
            )}
        </div>
    );
};

export default MyFavorites;
