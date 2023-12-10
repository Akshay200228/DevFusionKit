import { useEffect } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Message = ({ type, message, onClose }) => {
    let icon, bgColor, textColor;

    switch (type) {
        case 'success':
            icon = <FiCheckCircle className='animate-bounce' />;
            bgColor = 'bg-green-100';
            textColor = 'text-green-600';
            break;
        case 'error':
            icon = <FiAlertCircle />;
            bgColor = 'bg-red-100';
            textColor = 'text-red-600';
            break;
        case 'warning':
            icon = <FiInfo />;
            bgColor = 'bg-yellow-100';
            textColor = 'text-yellow-600';
            break;
        default:
            break;
    }

    useEffect(() => {
        // Set a timer to close the message after 3 seconds
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        // Clear the timer when the component unmounts or when the effect re-runs
        return () => clearTimeout(timer);
    }, [onClose]);

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
