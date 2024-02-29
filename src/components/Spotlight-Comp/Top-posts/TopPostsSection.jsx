"use client";

import useApiFetch from "@/hooks/useApiFetch";
import TopPostsCard from "./TopPostsCard";
import { SpotlightSkeleton } from "../../SkeltonLoading";
import ExploreButton from "../../Reusable-Comp/ExploreButton";

const TopPostsSection = () => {
    const compApiUrl = process.env.NEXT_PUBLIC_NEXUS_URL + "/api/code-components";
    const { data: cardData, isLoading: cardLoading } = useApiFetch(compApiUrl);

    return (
        <div>
            <h1 className="mb-4 text-4xl font-bold text-center text-slate-800">Top Posts</h1>
            <p className="mb-8 text-lg font-bold text-center text-blue-500 text-palanquin">All time</p>
            {cardLoading ? (
                <SpotlightSkeleton count={8} />
            ) : (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {cardData.slice(0, 6).map((card, index) => (
                        <TopPostsCard key={card._id} card={card} batch={index + 1} />
                    ))}
                </div>
            )}
            <div className="flex justify-center mt-8">
                <ExploreButton text="View All" href="/component" />
            </div>
        </div>
    );
};

export default TopPostsSection;
