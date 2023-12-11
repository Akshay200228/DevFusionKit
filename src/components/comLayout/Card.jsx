"use client";
// CardComponent.jsx
import { FaCode } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { LivePreview, LiveProvider } from 'react-live';
import useApiFetch from '@/hooks/useApiFetch';
import Loader from '../Loader';
import Link from 'next/link';

export default function CardComponent() {
    const apiUrl = "https://devnexus-server.onrender.com/api/code-components/";

    const { data: cardData, isLoading, error } = useApiFetch(apiUrl);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full pt-4 text-white"
            >
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <div>Error: {error.message}</div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="grid grid-cols-1 gap-8 p-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
                    >
                        {cardData.map((card) => {
                            return (
                                <motion.div
                                    key={card._id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col h-full p-4 bg-white rounded-lg shadow-xl"
                                >
                                    <LiveProvider code={card.code}>
                                        <div className="h-[50vh] mb-4 bg-blue-200 relative overflow-hidden rounded-lg">
                                            <div className="absolute inset-0 text-neutral-950">
                                                <LivePreview />
                                            </div>
                                        </div>
                                    </LiveProvider>

                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center">
                                            {card.creatorAvatar ? (
                                                <img
                                                    src={card.creatorAvatar}
                                                    alt="User Image"
                                                    width={36}
                                                    height={36}
                                                    className="mr-2 rounded-full"
                                                />
                                            ) : (
                                                <img
                                                    src="https://dev-nexus.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FdevLogo.8d21b413.png&w=640&q=75"
                                                    alt="Default User Image"
                                                    width={36}
                                                    height={36}
                                                    className="mr-2 rounded-full"
                                                />
                                            )}
                                            <h2 className="text-xl font-semibold text-gray-600">{card.title}</h2>
                                        </div>
                                        {/* View More Button */}
                                        {card._id && (
                                            <Link href={`/component/${card._id}`}>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="px-4 py-2 text-white transition-transform duration-300 ease-in-out rounded-full bg-gradient-to-r from-blue-300 to-blue-500 hover:shadow-lg focus:outline-none focus:ring focus:border-blue-300"
                                                >
                                                    <div className="flex items-center">
                                                        <FaCode className="mr-2 text-2xl" />
                                                        <span className="text-lg">Explore</span>
                                                    </div>
                                                </motion.button>
                                            </Link>
                                        )}

                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </motion.div>
        </>
    );
}
