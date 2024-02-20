import Link from 'next/link';
import { motion } from 'framer-motion';

const ExploreButton = ({ text, icon, href }) => {
    return (
        <Link href={href}>
            <motion.button
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 1, opacity: 0.9 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="px-4 py-2 text-white transition-transform duration-300 ease-in-out rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 hover:shadow-2xl focus:outline-none focus:ring focus:border-blue-300 transform-style-preserve-3d"
            >
                <div className="flex items-center space-x-2">
                    {icon}
                    <span className="text-lg">{text}</span>
                </div>
            </motion.button>
        </Link>
    );
};

export default ExploreButton;
