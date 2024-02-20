'use client';
import Container from "@/components/homeLayout/Container";
import useApiFetch from "@/hooks/useApiFetch";
import { SpotlightSkeleton, TopCreatorsCardSkeleton } from '@/components/SkeltonLoading';
import TopPostsCard from '@/components/Spotlight-Comp/TopPostsCard';
import TopCreatorsCard from '@/components/Spotlight-Comp/TopCreatorsCard';
import ExploreButton from '@/components/Reusable-Comp/ExploreButton';

const Spotlight = () => {
    // Define the API URL
    const compApiUrl = process.env.NEXT_PUBLIC_NEXUS_URL + "/api/code-components";
    const userApiUrl = process.env.NEXT_PUBLIC_NEXUS_URL + "/api/users";

    // Call the useApiFetch hook with the API URL
    const { data: cardData, isLoading: cardLoading, error: cardError } = useApiFetch(compApiUrl);

    // Call the useApiFetch hook with the API URL
    const { data: userData, isLoading: userLoading, error: userError } = useApiFetch(userApiUrl);

    // Function to get the top 6 code components with the largest number of bookmarks
    const getTopBookmarkedCodeComps = (data) => {
        // Sort code components based on the number of bookmarks (descending order)
        const sortedData = data.sort((a, b) => b.bookmarks.length - a.bookmarks.length);
        // Slice the top 6 code components
        return sortedData.slice(0, 6);
    };

    // Function to get the top 8 users with the largest number of followers
    const getTopFollowersUsers = (data) => {
        // Sort users based on the number of followers (descending order)
        const sortedUsers = data.sort((a, b) => b.followers.length - a.followers.length);
        // Slice the top 8 users
        return sortedUsers.slice(0, 6);
    };

    // Get top 6 code components with the largest number of bookmarks
    const topBookmarkedCodeComps = cardLoading ? [] : getTopBookmarkedCodeComps(cardData);

    // Get top 8 users with the largest number of followers
    const topFollowersUsers = userLoading ? [] : getTopFollowersUsers(userData.users);

    const defaultAvatar = 'https://res.cloudinary.com/daqvbo5ys/image/upload/v1704980512/e0gfxbxy6oyep4qt9ice';

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
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {topBookmarkedCodeComps.map((card) => (
                            <TopPostsCard key={card._id} card={card} />
                        ))}
                    </div>
                )}

                {/* View more button */}
                <div className="flex justify-center mt-8">
                    <ExploreButton
                        text="View All"
                        href="/component"
                    />
                </div>


                <hr className="my-12 border-t border-gray-300" />

                <h1 className="mb-4 text-4xl font-bold text-center text-slate-800">
                    Top Creators
                </h1>
                <p className="mb-8 text-lg font-bold text-center text-blue-500 text-palanquin">
                    All time
                </p>
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
        </Container>
    );
};

export default Spotlight;
