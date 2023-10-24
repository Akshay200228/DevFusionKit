import React from 'react';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Message = ({ type, message }) => {
    const icon = type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />;
    const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100';
    const textColor = type === 'success' ? 'text-green-600' : 'text-red-600';

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.5 }}
            className={`fixed z-10 flex items-center px-4 py-3 ${textColor} ${bgColor} rounded top-28 right-4`}
        >
            {icon && <span className="mr-2 text-xl">{icon}</span>}
            {message}
        </motion.div>
    );
};

export default Message;
