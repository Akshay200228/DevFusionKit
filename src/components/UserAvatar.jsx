import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

const UserAvatar = ({ createdBy, creatorAvatar }) => {
    const authData = useAuth();
    const userId = authData.user ? authData.user._id : null;
    const defaultAvatar = "https://dev-nexus.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FdevLogo.8d21b413.png&w=640&q=75";

    return (
        <Link
            href={userId === createdBy ? `/profile` : `/profile/${createdBy}`}
            className="w-12 h-12 overflow-hidden rounded-full"
        >
            <motion.img
                src={creatorAvatar || defaultAvatar}
                alt="User Image"
                width={48}
                height={48}
                className="object-cover w-full h-full rounded-full p-0.5 border-2 border-blue-600"
                initial={{ rotateY: -10, rotateX: 10 }}
                animate={{ rotateY: 0, rotateX: 0 }}
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
        </Link>
    );
};

export default UserAvatar
