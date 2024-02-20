import { FaCode, FaMedal } from 'react-icons/fa'; // Import FaMedal for the gold medal icon
import { GiPodium } from 'react-icons/gi'; // Import GiPodium for the silver podium icon
import { IoIosTrophy } from 'react-icons/io'; // Import IoIosTrophy for the bronze trophy icon
import { LivePreview, LiveProvider } from 'react-live';
import ExploreButton from '../Reusable-Comp/ExploreButton';
import { IoBookmark } from 'react-icons/io5';

const TopPostsCard = ({ card, batch }) => {
    // Function to select the appropriate icon based on batch
    const selectIcon = (batch) => {
        switch (batch) {
            case '1st':
                return <FaMedal className="text-2xl text-[#FFD700]" />;
            case '2nd':
                return <GiPodium className="text-2xl text-[#C0C0C0]" />;
            case '3rd':
                return <IoIosTrophy className="text-2xl text-[#cd7f32]" />;
            default:
                return null;
        }
    };

    // Function to select the background color based on batch
    const selectBackgroundColor = (batch) => {
        switch (batch) {
            case '1st':
                return 'bg-red-500';
            case '2nd':
                return 'bg-black';
            case '3rd':
                return 'bg-blue-500';
            default:
                return 'bg-gray-600';
        }
    };

    return (
        <div className="relative transition duration-300 bg-white rounded-lg shadow-xl hover:shadow-2xl">
            {batch && (
                <span className={`absolute z-10 p-2 transition-transform duration-300 transform rounded-full top-2 left-2 hover:scale-110 ${selectBackgroundColor(batch)}`}>
                    {selectIcon(batch)}
                    <span className="font-semibold text-gray-200 font-palanquin">{batch}</span>
                </span>
            )}
            <LiveProvider code={card.code}>
                <div className="min-h-[50vh] bg-gradient-to-r from-blue-300 to-blue-200 relative rounded-t-lg">
                    <div className="absolute inset-0 overflow-auto text-neutral-950 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-blue-200">
                        <LivePreview />
                    </div>
                </div>
            </LiveProvider>
            <div className="flex items-center justify-between p-4">
                <ExploreButton
                    text="Explore"
                    icon={<FaCode className="text-xl" />}
                    href={`/component/${card._id}`}
                />
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