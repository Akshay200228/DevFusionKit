import { FaCode, FaMedal } from 'react-icons/fa'; // Import FaMedal for the gold medal icon
import { LivePreview, LiveProvider } from 'react-live';
import ExploreButton from '../../Reusable-Comp/ExploreButton';
import { IoBookmark } from 'react-icons/io5';
import { motion } from 'framer-motion';

const TopPostsCard = ({ card, batch }) => {
    // Function to select the appropriate icon based on batch
    const selectIcon = (batch) => {
        switch (batch) {
            case '1st':
                return <img
                    src="https://res.cloudinary.com/daqvbo5ys/image/upload/v1704980512/nrgfdhvckp2cr8ytiykx"
                    alt="Gold"
                    className='w-16 h-16'
                />;
            case '2nd':
                return <img
                    src="https://res.cloudinary.com/daqvbo5ys/image/upload/v1704980512/w5ofnmpt3oombzfh8lcm"
                    alt="Gold"
                    className='w-16 h-16'
                />;
            case '3rd':
                return <img
                    src="https://res.cloudinary.com/daqvbo5ys/image/upload/v1704980512/gripnuvqntanje7vkjjk"
                    alt="Gold"
                    className='w-16 h-16'
                />;
            default:
                return null;
        }
    };

    // Function to select the background color based on batch
    const selectBackgroundColor = (batch) => {
        switch (batch) {
            case '1st':
                return 'bg-transperant';
            case '2nd':
                return 'bg-transperant';
            case '3rd':
                return 'bg-transperant';
            default:
                return 'bg-transperant';
        }
    };

    return (
        <div className="relative transition duration-300 bg-white rounded-lg shadow-xl hover:shadow-2xl">
            {batch && (
                <motion.span
                    className={`absolute z-10 p-2 transform rounded-full top-0 left-0 ${selectBackgroundColor(batch)}`}
                    whileHover={{ scale: 1.1 }}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
                >
                    <motion.div
                        className="flex items-center justify-center"
                        whileHover={{ rotate: [0, -5, 5, -5, 5, 0], transition: { duration: 0.5 } }}
                    >
                        {selectIcon(batch)}
                        {/* <span className="text-lg font-semibold text-gray-200 font-palanquin">{batch}</span> */}
                    </motion.div>
                </motion.span>

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