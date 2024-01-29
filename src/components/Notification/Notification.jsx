import { IoNotificationsOutline } from 'react-icons/io5';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Notification = () => {
    const [isRinging, setIsRinging] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const startRingingAnimation = () => {
        return setInterval(() => {
            setIsRinging(true);
            setTimeout(() => setIsRinging(false), 500);
        }, 5000);
    };

    useEffect(() => {
        let ringingInterval;

        if (!isDropdownOpen) {
            ringingInterval = startRingingAnimation();
        } else {
            setIsRinging(false);
        }

        return () => clearInterval(ringingInterval);
    }, [isDropdownOpen]);

    useEffect(() => {
        const closeDropdown = () => {
            setIsDropdownOpen(false);
        };

        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                closeDropdown();
            }
        };

        if (isDropdownOpen) {
            setIsRinging(false);
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    };

    const notificationItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
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
                        ref={dropdownRef}
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="absolute right-0 mt-2 overflow-x-hidden overflow-y-auto bg-white border border-gray-300 rounded-md shadow-md scrollbar-thin w-72 h-96"
                    >
                        <h1 className="flex items-center gap-2 p-3 text-xl font-bold text-blue-500 bg-blue-100">
                            <IoNotificationsOutline />Recent Notifications:
                        </h1>

                        <hr className="my-2 border-t border-gray-300" />

                        <motion.ul className="list-none" variants={dropdownVariants}>
                            {[...Array(20)].map((_, index) => (
                                <motion.li
                                    key={index}
                                    variants={notificationItemVariants}
                                    whileHover={{ scale: 1.05 }}
                                    className="p-3 mb-1 text-blue-700 cursor-pointer hover:bg-blue-100"
                                >
                                    Notification {index + 1}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Notification;
