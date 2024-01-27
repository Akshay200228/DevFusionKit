// useFollowerFollowing.js
import { useState } from 'react';

const useFollowerFollowing = () => {
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

    const updateCounts = (newFollowerCount, newFollowingCount) => {
        setFollowerCount(newFollowerCount);
        setFollowingCount(newFollowingCount);
    };

    return { followerCount, followingCount, updateCounts };
};

export default useFollowerFollowing;
