"use client";
import { useEffect, useState } from 'react';
import { FaCode } from 'react-icons/fa';
import CardSkeleton from './CardSkeleton';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { LivePreview, LiveProvider } from 'react-live';
import { devLogo } from '@/images';

export default function CardComponent() {
    const [cardData, setCardData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    // Fetch data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/code-components/");
                if (response.ok) {
                    const data = await response.json();
                    setCardData(data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full pt-10 overflow-y-auto text-white scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-gray-300 scrollbar-thumb-rounded-full"
                style={{ maxHeight: 'calc(100vh - 80px)' }}
            >
                {isLoading ? ( // Display loading indicator while fetching data
                    <p>Loading...</p>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="grid grid-cols-1 gap-8 p-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
                    >
                        {cardData.map((card) => (
                            <motion.div
                                key={card.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col h-full p-4 bg-white rounded-lg shadow-xl"
                            >
                                <LiveProvider code={card.code}>
                                    <div className="h-[50vh] mb-10 bg-blue-200 relative">
                                        <div className="absolute inset-0">
                                            <LivePreview />
                                        </div>
                                    </div>
                                </LiveProvider>

                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center">
                                        <Image
                                            src={devLogo}
                                            alt="User Image"
                                            width={36}
                                            height={36}
                                            className="mr-4 rounded-full"
                                        />
                                        <h2 className="text-xl font-semibold text-gray-600">{card.userName}</h2>
                                    </div>
                                    <Link
                                        href={`/component/${card.id}`}
                                        className="p-2 text-blue-400 rounded-full hover-bg-blue-200"
                                    >
                                        <FaCode className="text-4xl" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </motion.div>
        </>
    );
}
