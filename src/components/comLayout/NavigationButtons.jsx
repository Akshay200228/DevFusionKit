// Updated NavigationButtons.js

import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const NavigationButtons = ({ handlePrevPage, handleNextPage, page, cardData }) => {
    return (
        <div className="flex justify-between mx-4 my-4 md:my-10">
            <motion.button
                onClick={handlePrevPage}
                disabled={page === 1}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 1, opacity: 0.9 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex-grow flex items-center justify-start px-4 py-2 text-xl md:text-2xl mr-2 text-white transition-transform duration-300 ease-in-out rounded-2xl ${page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'}`}
            >
                <FaArrowLeft className="mr-2" /> Previous Page
            </motion.button>

            <motion.button
                onClick={handleNextPage}
                disabled={!cardData || cardData.length === 0}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 1, opacity: 0.9 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex-grow flex items-center justify-end p-4 text-xl md:text-2xl text-white transition-transform duration-300 ease-in-out rounded-2xl ${(!cardData || cardData.length === 0) ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'}`}
            >
                Next Page <FaArrowRight className="ml-2" />
            </motion.button>
        </div>
    );
};

export default NavigationButtons;
