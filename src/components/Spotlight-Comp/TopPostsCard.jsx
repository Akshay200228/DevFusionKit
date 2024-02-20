import Link from 'next/link';
import { FaCode } from "react-icons/fa";
import { IoBookmark } from 'react-icons/io5';
import { LivePreview, LiveProvider } from 'react-live';

const TopPostsCard = ({ card }) => {
    return (
        <div className="relative transition duration-300 bg-white rounded-lg shadow-xl hover:shadow-2xl">
            <LiveProvider code={card.code}>
                <div className="min-h-[50vh] bg-gradient-to-r from-blue-300 to-blue-200 relative rounded-t-lg">
                    <div className="absolute inset-0 overflow-auto text-neutral-950 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-blue-200">
                        <LivePreview />
                    </div>
                </div>
            </LiveProvider>
            <div className="flex items-center justify-between p-4">
                <Link href={`/component/${card._id}`}>
                    <button className="px-4 py-2 text-white rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring focus:border-blue-300">
                        <div className="flex items-center space-x-2">
                            <FaCode className="text-xl" />
                            <span className="text-lg">Explore</span>
                        </div>
                    </button>
                </Link>
                {/* Bookmark count */}
                <div className="flex items-center space-x-1">
                    <IoBookmark className="w-6 h-6 text-blue-500" />
                    <span className="font-semibold text-gray-500 font-palanquin">
                        {card.bookmarks.length}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TopPostsCard;
