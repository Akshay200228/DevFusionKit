// useFollowerFollowing.js
import { useState } from 'react';

const useFollowerFollowing = () => {
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [loadingCounts, setLoadingCounts] = useState(false);

    const updateCounts = async (newFollowerCount, newFollowingCount) => {
        try {
            setLoadingCounts(true);
            setFollowerCount(newFollowerCount);
            setFollowingCount(newFollowingCount);
        } finally {
            setLoadingCounts(false);
        }
    };

    return { followerCount, followingCount, updateCounts, loadingCounts };
};

export default useFollowerFollowing;

