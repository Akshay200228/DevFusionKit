import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiUsers } from 'react-icons/fi';

const TopCreatorsCard = ({ user, defaultAvatar }) => {
    return (
        <Link href={`/profile/${user._id}`}>
            <motion.div
                key={user._id}
                className="overflow-hidden bg-white rounded-lg shadow-xl hover:shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
            >
                <div className="relative overflow-hidden">
                    <img
                        src={user.avatar || defaultAvatar}
                        alt={user.name}
                        className="object-cover w-full h-48"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                        <motion.p
                            className="text-lg font-semibold text-white"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {user.name}
                        </motion.p>
                        <motion.p
                            className="text-gray-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            @{user.username}
                        </motion.p>
                    </div>
                </div>
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                        <FiUsers className="mr-2 text-gray-500" />
                        <p className="text-gray-500">{user.followers.length} Followers</p>
                    </div>
                    <div className="flex items-center">
                        <FiUsers className="mr-2 text-gray-500" />
                        <p className="text-gray-500">{user.following.length} Following</p>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default TopCreatorsCard;
