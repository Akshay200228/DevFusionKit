import { useEffect, useState } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';
import { motion, useAnimation } from 'framer-motion';

const Message = ({ type, message, onClose }) => {
    const [progress, setProgress] = useState(0);

    const iconMap = {
        success: <FiCheckCircle className='animate-bounce' />,
        error: <FiAlertCircle />,
        warning: <FiInfo />,
    };

    const bgColorMap = {
        success: 'bg-green-100',
        error: 'bg-red-100',
        warning: 'bg-yellow-100',
    };

    const textColorMap = {
        success: 'text-green-600',
        error: 'text-red-600',
        warning: 'text-yellow-600',
    };

    const icon = iconMap[type];
    const bgColor = bgColorMap[type];
    const textColor = textColorMap[type];

    const controls = useAnimation();

    useEffect(() => {
        // Set a timer to close the message after 3 seconds
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        // Update progress every 100ms until 3 seconds
        const interval = setInterval(() => {
            setProgress((prevProgress) => Math.min(prevProgress + 100 / 30, 100));
        }, 100);

        // Clear the timer and interval when the component unmounts or when the effect re-runs
        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [onClose]);

    useEffect(() => {
        // Animate progress bar
        controls.start({ width: `${progress}%` });
    }, [controls, progress]);

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.5 }}
            className={`fixed z-50 flex flex-col items-center justify-center px-4 py-3 ${textColor} ${bgColor} rounded-md shadow-lg top-10 right-4`}
        >
            <div className="flex items-center mb-2">
                {icon && <span className="mr-2 text-xl">{icon}</span>}
                <p className="text-lg font-medium">{message}</p>
            </div>
            <div className="w-full h-2 bg-white rounded">
                <motion.div
                    style={{ width: `${progress}%`, height: '100%', background: ' rgb(134 239 172)' }}
                    animate={controls}
                ></motion.div>
            </div>
        </motion.div>
    );
};

export default Message;
