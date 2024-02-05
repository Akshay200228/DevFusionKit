import Link from 'next/link';
import { FaEnvelope, FaLink } from 'react-icons/fa';
import FollowButton from "./FollowButton";
import { MdEditLocation } from 'react-icons/md';
import { HiMiniUsers } from "react-icons/hi2";

const UserInfo = ({
    avatar,
    name,
    username,
    email,
    openImageModal,
    isFollowing,
    onFollow,
    onUnfollow,
    followerCount,
    followingCount,
    followUnfollowLoading,
    portfolio,
    linkedin,
    github,
    stateName,
    cityName
}) => (
    <div className="flex-shrink-0 w-full mb-8 md:w-1/3 lg:w-1/4 xl:w-1/5 md:pr-8 md:mb-0">
        <div className="relative mx-auto mb-4 overflow-visible border-4 border-blue-500 rounded-full w-36 h-36 md:w-44 md:h-44 lg:w-56 lg:h-56 xl:w-64 xl:h-64">
            <img
                src={avatar}
                alt={name}
                className="object-cover w-full h-full p-1 transition transform rounded-full cursor-pointer hover:scale-105"
                onClick={() => openImageModal(avatar)}
            />
        </div>

        <div className="my-4 text-start md:text-left">
            <h1 className="mb-2 text-3xl font-semibold text-blue-500">{name}</h1>
            <p className="mb-2 text-xl text-gray-600">{username}</p>
        </div>

        <FollowButton
            isFollowing={isFollowing}
            onFollow={onFollow}
            onUnfollow={onUnfollow}
            followUnfollowLoading={followUnfollowLoading}
        />

        {/* Display follower and following count with icons */}
        <div className="flex items-center justify-start my-4">
            <div className="flex items-center space-x-2">
                <HiMiniUsers className="text-xl text-blue-500" />
                {/* <FaUsers className="text-xl text-blue-500" /> */}
                <span className="font-bold text-gray-700">{followerCount}</span>
                <span className="text-gray-500">Followers</span>
            </div>
            <div className="h-6 mx-2 border-l-2 border-gray-300" />
            <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-700">{followingCount}</span>
                <span className="text-gray-500">Following</span>
            </div>
        </div>

        <hr className="my-2 border-t border-gray-300" />

        {/* Other user information */}
        <div className="mt-4 space-y-1 text-center md:text-left">
            <div className="flex items-center text-sm text-gray-600">
                <FaEnvelope className="mr-2" />
                {email}
            </div>
            {(cityName || stateName) && (
                <div className="flex items-center text-sm text-gray-600">
                    <MdEditLocation className="mr-2" />
                    {cityName && stateName ? `${cityName}, ${stateName}` : (cityName || stateName)}
                </div>
            )}
            {portfolio && (
                <div className="flex items-center text-sm text-gray-600">
                    <FaLink className="mr-2" />
                    <Link href={portfolio} className='text-blue-500 underline'>
                        Personal Portfolio
                    </Link>
                </div>
            )}
        </div>
    </div>
);

export default UserInfo;
