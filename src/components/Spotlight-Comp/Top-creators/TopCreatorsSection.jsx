"use client";

import { TopCreatorsCardSkeleton } from "@/components/SkeltonLoading";
import useApiFetch from "@/hooks/useApiFetch";
import TopCreatorsCard from "./TopCreatorsCard";



const TopCreatorsSection = () => {
    const userApiUrl = process.env.NEXT_PUBLIC_NEXUS_URL + "/api/users";
    const { data: userData, isLoading: userLoading } = useApiFetch(userApiUrl);
    
    // Function to get the top 8 users with the largest number of followers
    const getTopFollowersUsers = (data) => {
        // Sort users based on the number of followers (descending order)
        const sortedUsers = data.sort((a, b) => b.followers.length - a.followers.length);
        // Slice the top 8 users
        return sortedUsers.slice(0, 6);
    };

    // Get top 8 users with the largest number of followers
    const topFollowersUsers = userLoading ? [] : getTopFollowersUsers(userData.users);
    const defaultAvatar = 'https://res.cloudinary.com/daqvbo5ys/image/upload/v1704980512/e0gfxbxy6oyep4qt9ice';

    return (
        <div>
            <h1 className="mb-4 text-4xl font-bold text-center text-slate-800">Top Creators</h1>
            <p className="mb-8 text-lg font-bold text-center text-blue-500 text-palanquin">All time</p>
            {userLoading ? (
                <TopCreatorsCardSkeleton count={6} />
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {topFollowersUsers.map((user) => (
                        <TopCreatorsCard key={user._id} user={user} defaultAvatar={defaultAvatar} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TopCreatorsSection;
