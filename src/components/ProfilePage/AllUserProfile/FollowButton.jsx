const FollowButton = ({ isFollowing, onFollow, onUnfollow }) => (
    <>
        {isFollowing ? (
            <button onClick={onUnfollow} className="w-full px-4 py-2 font-bold text-white bg-red-700 rounded-full hover:bg-red-900">
                Unfollow
            </button>
        ) : (
            <button onClick={onFollow} className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600">
                Follow
            </button>
        )}
    </>
);

export default FollowButton;