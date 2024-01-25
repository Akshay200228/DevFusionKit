import FollowButton from "./FollowButton";

const UserInfo = ({ avatar, name, username, email, openImageModal, isFollowing, onFollow, onUnfollow, followerCount, followingCount }) => (
    <div className="flex-shrink-0 w-full mb-4 md:w-1/3 lg:w-1/4 xl:w-1/5 md:pr-8 md:mb-0">
        <div className="relative mx-auto mb-4 overflow-visible border-4 border-blue-500 rounded-full w-44 h-44 xl:w-56 xl:h-56">
            <img
                src={avatar}
                alt={name}
                className="object-cover w-full h-full p-1 rounded-full"
                onClick={() => openImageModal(avatar)}
            />
        </div>
        <FollowButton
            isFollowing={isFollowing}
            onFollow={onFollow}
            onUnfollow={onUnfollow}
        />
        {/* Other user information */}
        <h1 className="mb-2 text-2xl font-semibold text-center md:text-left">{name}</h1>
        <p className="mb-2 text-center text-gray-600 md:text-left">{username}</p>
        <p className="mb-2 text-center text-gray-600 md:text-left">{email}</p>
        {/* Display follower and following count */}
        <p className="mb-2 text-center text-gray-600 md:text-left">
            Followers: {followerCount} | Following: {followingCount}
        </p>
    </div>
);

export default UserInfo;