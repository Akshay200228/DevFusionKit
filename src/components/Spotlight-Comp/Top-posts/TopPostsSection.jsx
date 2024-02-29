"use client";

import { SpotlightSkeleton } from "@/components/SkeltonLoading";
import useApiFetch from "@/hooks/useApiFetch";
import TopPostsCard from "./TopPostsCard";
import ExploreButton from "@/components/Reusable-Comp/ExploreButton";



const TopPostsSection = () => {
    const compApiUrl = process.env.NEXT_PUBLIC_NEXUS_URL + "/api/code-components";
    const { data: cardData, isLoading: cardLoading } = useApiFetch(compApiUrl);

    // Function to get the top 6 code components with the largest number of bookmarks
    const getTopBookmarkedCodeComps = (data) => {
        // Sort code components based on the number of bookmarks (descending order)
        const sortedData = data.sort((a, b) => b.bookmarks.length - a.bookmarks.length);
        // Slice the top 6 code components
        return sortedData.slice(0, 6);
    };

    // Get top 6 code components with the largest number of bookmarks
    const topBookmarkedCodeComps = cardLoading ? [] : getTopBookmarkedCodeComps(cardData);

    return (
        <div>
            <h1 className="mb-4 text-4xl font-bold text-center text-slate-800">Top Posts</h1>
            <p className="mb-8 text-lg font-bold text-center text-blue-500 text-palanquin">All time</p>
            {cardLoading ? (
                <SpotlightSkeleton count={8} />
            ) : (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {topBookmarkedCodeComps.map((card, index) => {
                        let suffix = '';
                        if (index + 1 === 1) {
                            suffix = 'st';
                        } else if (index + 1 === 2) {
                            suffix = 'nd';
                        } else if (index + 1 === 3) {
                            suffix = 'rd';
                        } else {
                            suffix = 'th';
                        }
                        return <TopPostsCard key={card._id} card={card} batch={`${index + 1}${suffix}`} />;
                    })}
                </div>
            )}
            <div className="flex justify-center mt-8">
                <ExploreButton text="View All" href="/component" />
            </div>
        </div>
    );
};

export default TopPostsSection;
