"use client"
// VerificationPopup.js
import { FaCheckCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const VerificationPopup = ({ onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 bg-opacity-80"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="flex flex-col items-center p-8 text-white bg-gray-800 rounded-lg shadow-lg"
        >
          <FaCheckCircle className="mb-4 text-6xl text-green-400 animate-bounce" />
          <p className="mb-4 text-2xl font-bold">
            🎉 Woohoo! Your OTP is Verified!
          </p>
          <p className="mb-8 text-lg">
            Congratulations! You&apos;re all set to explore exciting things.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="px-6 py-3 text-white bg-green-500 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Let&apos;s Go!
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VerificationPopup;
