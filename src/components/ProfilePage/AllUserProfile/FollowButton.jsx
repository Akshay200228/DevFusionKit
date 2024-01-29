import { AiFillMessage } from 'react-icons/ai';
import { FaUserMinus, FaUserCheck } from 'react-icons/fa';

const FollowButton = ({ isFollowing, onFollow, onUnfollow }) => {
    return (
        // <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
        <div className="flex flex-row items-center justify-between gap-2 text-sm">
            {isFollowing ? (
                <button
                    onClick={onUnfollow}
                    className="flex items-center justify-center w-full py-2 font-bold text-white transition duration-300 ease-in-out transform bg-red-700 rounded-full md:w-1/2 hover:bg-red-900"
                >
                    <FaUserMinus className="mr-2" /> Unfollow
                </button>
            ) : (
                <button
                    onClick={onFollow}
                    className="flex items-center justify-center w-full px-4 py-2 font-bold text-white transition duration-300 ease-in-out transform bg-blue-500 rounded-full md:w-1/2 hover:bg-blue-600"
                >
                    <FaUserCheck className="mr-2" /> Follow
                </button>
            )}
            <button
                className="flex items-center justify-center w-full px-4 py-2 font-bold text-white transition duration-300 ease-in-out transform bg-green-500 rounded-full md:w-1/2 hover:bg-green-600 "
            >
                <AiFillMessage className="mr-2" /> Message
            </button>
        </div>
    )
};

export default FollowButton;