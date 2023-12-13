// Updated NavigationButtons.js

import { motion } from 'framer-motion';

const NavigationButtons = ({ handlePrevPage, handleNextPage, page, cardData }) => {
    return (
        <div className="flex justify-between p-4 mx-4 my-4">
            <motion.button
                onClick={handlePrevPage}
                disabled={page === 1}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 1, opacity: 0.9 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`px-4 py-2 mr-2 text-white transition-transform duration-300 ease-in-out rounded-full ${
                    page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 hover:shadow-2xl focus:outline-none focus:ring focus:border-blue-300 transform-style-preserve-3d'
                }`}
            >
                Previous
            </motion.button>

            <motion.button
                onClick={handleNextPage}
                disabled={!cardData || cardData.length === 0}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 1, opacity: 0.9 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`px-4 py-2 text-white transition-transform duration-300 ease-in-out rounded-full ${
                    (!cardData || cardData.length === 0) ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 hover:shadow-2xl focus:outline-none focus:ring focus:border-blue-300 transform-style-preserve-3d'
                }`}
            >
                Next
            </motion.button>
        </div>
    );
};

export default NavigationButtons;
