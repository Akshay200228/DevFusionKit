'use client';
import Link from 'next/link';
import Container from "@/components/homeLayout/Container";
import useApiFetch from "@/hooks/useApiFetch";
import { FaCode } from "react-icons/fa";
import { LivePreview, LiveProvider } from 'react-live';
import { SpotlightSkeleton } from '@/components/SkeltonLoading';

const Spotlight = () => {
    // Define the API URL
    const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL + "/api/code-components";

    // Call the useApiFetch hook with the API URL
    const { data: cardData, isLoading: cardLoading, error: cardError } = useApiFetch(apiUrl);

    // Function to get the top 6 code components with the largest number of bookmarks
    const getTopBookmarkedCodeComps = (data) => {
        // Sort code components based on the number of bookmarks (descending order)
        const sortedData = data.sort((a, b) => b.bookmarks.length - a.bookmarks.length);
        // Slice the top 6 code components
        return sortedData.slice(0, 8);
    };

    // Get top 6 code components with the largest number of bookmarks
    const topBookmarkedCodeComps = cardLoading ? [] : getTopBookmarkedCodeComps(cardData);

    return (
        <Container>
            <div className="min-h-screen px-4 py-8">
                <h1 className="mb-4 text-4xl font-bold text-center text-slate-800">
                    Top Posts
                </h1>
                <p className="mb-8 text-lg font-bold text-center text-blue-500 text-palanquin">
                    All time
                </p>
                {cardLoading ? (
                    <SpotlightSkeleton count={8} />
                ) : (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {topBookmarkedCodeComps.map((card) => (
                            <div key={card._id} className="relative transition duration-300 bg-white rounded-lg shadow-xl hover:shadow-2xl">
                                <LiveProvider code={card.code}>
                                    <div className="min-h-[50vh] bg-gradient-to-r from-blue-300 to-blue-200 relative rounded-t-lg">
                                        <div className="absolute inset-0 overflow-auto text-neutral-950 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-blue-200">
                                            <LivePreview />
                                        </div>
                                    </div>
                                </LiveProvider>
                                <div className="flex items-center justify-center p-4">
                                    <Link href={`/component/${card._id}`}>
                                        <button className="px-4 py-2 text-white rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring focus:border-blue-300">
                                            <div className="flex items-center space-x-2">
                                                <FaCode className="text-xl" />
                                                <span className="text-lg">Explore</span>
                                            </div>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Container>
    );
};

export default Spotlight;
