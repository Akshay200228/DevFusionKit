"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const MemberCard = ({ name, role, description, image, link }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6 overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg"
    >
      <div className="relative w-40 h-40 mx-auto mb-4 overflow-hidden rounded-full">
        <Image
          src={image}
          alt={`${name}'s profile`}
          layout="fill"
          className="rounded-full"
        />
      </div>
      <div className="text-center">
        <h2 className="mb-2 text-xl font-semibold">{name}</h2>
        <p className="mb-2 text-gray-500">{role}</p>
        <p className="mb-4 text-gray-600">{description}</p>
        <Link href={link}>
          <button className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600">
            Connect
          </button>
        </Link>
        <span className="block mt-2 text-gray-400">Joined: August 2022</span>
      </div>
    </motion.div>
  );
};

export default MemberCard;
