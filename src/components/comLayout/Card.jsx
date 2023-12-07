"use client";
// CardComponent.jsx
import { FaCode } from 'react-icons/fa';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LivePreview, LiveProvider } from 'react-live';
import { devLogo } from '@/images';
import { useRouter } from 'next/navigation';
import useApiFetch from '@/hooks/useApiFetch';
import Loader from '../Loader';

export default function CardComponent() {
    const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL + "/api/code-components/" || "http://localhost:8000/api/code-components/";
    // const apiUrl = "https://devnexus-server.onrender.com/api/code-components/";
    console.log("API url ", apiUrl)
    const { data: cardData, isLoading, error } = useApiFetch(apiUrl);

    const router = useRouter();

    const handleViewMore = (slug) => {
        console.log("Id: ", slug);
        router.push(`/code-comp/${slug}`);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full pt-10 overflow-y-auto text-white scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-gray-300 scrollbar-thumb-rounded-full"
                style={{ maxHeight: 'calc(100vh - 80px)' }}
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
                        {cardData.map((card) => (
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
                                        <Image
                                            src={devLogo}
                                            alt="User Image"
                                            width={36}
                                            height={36}
                                            className="mr-2 rounded-full"
                                        />
                                        <h2 className="text-xl font-semibold text-gray-600">{card.title}</h2>
                                    </div>
                                    <button
                                        onClick={() => handleViewMore(card._id)}
                                        className="p-2 text-blue-400 rounded-full hover-bg-blue-200"
                                    >
                                        <FaCode className="text-4xl" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </motion.div>
        </>
    );
}
