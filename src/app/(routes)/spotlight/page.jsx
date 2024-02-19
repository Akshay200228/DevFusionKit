'use client';
import Link from 'next/link';
import UserAvatar from "@/components/UserAvatar";
import Container from "@/components/homeLayout/Container";
import useApiFetch from "@/hooks/useApiFetch";
import { FaCode } from "react-icons/fa";
import { LivePreview, LiveProvider } from 'react-live';
import { CardSkeleton } from '@/components/SkeltonLoading';

const Spotlight = () => {
    // Define the API URL
    const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL+"/api/code-components";
    
    // Call the useApiFetch hook with the API URL
    const { data: cardData, isLoading: cardLoading, error: cardError } = useApiFetch(apiUrl);

    // Function to get the top 6 code components with the largest number of bookmarks
    const getTopBookmarkedCodeComps = (data) => {
        // Sort code components based on the number of bookmarks (descending order)
        const sortedData = data.sort((a, b) => b.bookmarks.length - a.bookmarks.length);
        // Slice the top 6 code components
        return sortedData.slice(0, 6);
    };

    // Get top 6 code components with the largest number of bookmarks
    const topBookmarkedCodeComps = cardLoading ? [] : getTopBookmarkedCodeComps(cardData);

    if (cardLoading) {
        return (
            <CardSkeleton count={9} />
        );
    }
    return (
        <Container>
            <div className="min-h-screen pt-4">
                <h1 className='text-2xl font-bold text-center text-slate-800'>
                    Top Posts
                </h1>
                <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {topBookmarkedCodeComps.map((card) => (
                        <div key={card._id} className="relative flex flex-col h-auto bg-white rounded-lg shadow-xl transform-style-preserve-3d hover:shadow-2xl">
                            <LiveProvider code={card.code}>
                                <div className="min-h-[50vh] mb-4 bg-gradient-to-r from-blue-300 to-blue-200 relative rounded-t-lg transform-style-preserve-3d">
                                    <div className="absolute inset-0 overflow-auto text-neutral-950 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-blue-200">
                                        <LivePreview />
                                    </div>
                                </div>
                            </LiveProvider>
                            <div className="flex items-center justify-center px-2 mb-2">
                                <div className="flex items-center space-x-3">
                                    <div>
                                        <Link href={`/component/${card._id}`}>
                                            <button
                                                className="px-4 py-2 text-white transition-transform duration-300 ease-in-out rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 hover:shadow-2xl focus:outline-none focus:ring focus:border-blue-300 transform-style-preserve-3d text"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <FaCode className="text-xl md:text-3xl" />
                                                    <span className="text-lg">Explore</span>
                                                </div>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default Spotlight;
