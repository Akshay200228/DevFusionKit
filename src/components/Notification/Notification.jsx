// Notification.jsx
import { IoNotificationsOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Notification = () => {
    const [isRinging, setIsRinging] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        let ringingInterval;

        if (!isDropdownOpen) {
            ringingInterval = setInterval(() => {
                setIsRinging(true);
                setTimeout(() => setIsRinging(false), 500); // Ringing duration: 500ms
            }, 5000);
        } else {
            setIsRinging(false);
        }

        return () => clearInterval(ringingInterval);
    }, [isDropdownOpen]);

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className={`relative hidden border-2 border-blue-500 rounded-xl lg:block ${isRinging && 'ringing'}`}>
            <IoNotificationsOutline
                onClick={toggleDropdown}
                className={`p-0.5 w-10 h-10 text-blue-600 ${isRinging && 'ringing'}`}
            />
            <AnimatePresence>
                {isDropdownOpen && (
                    <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute right-0 mt-2 overflow-x-hidden overflow-y-auto bg-white border border-gray-300 rounded-md shadow-md w-72 h-96"
                    >
                        {/* Static data in the dropdown */}
                        <h1 className="flex items-center gap-2 p-3 text-xl font-bold text-blue-500"><IoNotificationsOutline /> Recent Notifications:</h1>

                        <hr className="my-2 border-t border-gray-300" />

                        <ul className="list-none">
                            {[...Array(20)].map((_, index) => (
                                <motion.li
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    className="p-3 mb-1 text-blue-700 cursor-pointer"
                                >
                                    Notification {index + 1}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Notification;