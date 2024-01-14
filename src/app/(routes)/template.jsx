"use client"
// Import necessary dependencies
import { motion } from 'framer-motion';

// Transition component with framer motion and a simple animation
export default function Template({ children }) {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.75 }}
        >
            {children}
        </motion.div>
    );
}
