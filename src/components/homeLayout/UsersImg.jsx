'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import axios from 'axios';
import { UserImgSkeleton } from '../SkeltonLoading';

const UsersImg = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/users`);
                if (response.status !== 200) {
                    throw new Error('Failed to fetch users');
                }
                setUsers(response.data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const getRandomUsers = () => {
        const randomUsers = [];
        const numUsers = users.length;
        const numAvatars = Math.min(numUsers, 5);
        const selectedIndexes = new Set();

        while (randomUsers.length < numAvatars) {
            const randomIndex = Math.floor(Math.random() * numUsers);
            if (!selectedIndexes.has(randomIndex)) {
                randomUsers.push(users[randomIndex]);
                selectedIndexes.add(randomIndex);
            }
        }

        return randomUsers;
    };

    if (isLoading) {
        return <UserImgSkeleton />
    }

    return (
        <motion.div className="flex items-start justify-start mt-8">
            {getRandomUsers().map((user, index) => (
                <div key={user._id}>
                    <Link href={`/profile/${user._id}`} className={`relative ${index !== 0 ? '-ml-4' : ''}`}>
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                            src={user.avatar || "https://dev-nexus.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FdevLogo.8d21b413.png&w=640&q=75"}
                            alt={user.username || "User Avatar"}
                            className="w-12 h-12 bg-white border-2 border-white rounded-full shadow-lg hover:shadow-xl"
                        />
                    </Link>
                    {index === 4 && (
                        <div className="relative ml-4">
                            <div className="flex items-center justify-center w-12 h-12 -ml-8 bg-gray-300 border-2 border-white rounded-full shadow-lg cursor-pointer">
                                <span className="font-semibold text-gray-800">10+</span>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </motion.div>
    );
};

export default UsersImg;
