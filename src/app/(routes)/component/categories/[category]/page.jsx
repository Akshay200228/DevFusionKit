"use client"
// CompCategory.js
import { motion } from 'framer-motion';
import { LivePreview, LiveProvider } from 'react-live';
import Link from 'next/link';
import { CardSkeleton } from '@/components/SkeltonLoading';
import { FaCode } from 'react-icons/fa';
import useApiFetch from '@/hooks/useApiFetch';
import useBookmark from '@/hooks/useBookmark';
import { IoBookmark } from 'react-icons/io5';
import { useAuth } from '@/hooks/useAuth';

const CompCategory = ({ params }) => {
  const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;
  const { data: codeComponents, isLoading, error } = useApiFetch(`${apiUrl}/api/code-components/category/${params.category}`) || {};

  const authData = useAuth();
  const user = authData.user;

  // Assuming user.bookmarks is an array of bookmarked code components
  const { bookmarkStates, handleAddBookmark } = useBookmark(user ? user.bookmarks : []);

  return (
    <>
      {isLoading ? (
        <CardSkeleton count={9} />
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : codeComponents && codeComponents.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid grid-cols-1 gap-8 p-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
        >
          {codeComponents.map((card) => (
            <motion.div
              key={card._id}
              initial={{ rotateY: -10, rotateX: 10 }}
              animate={{ rotateY: 0, rotateX: 0 }}
              whileHover={{ rotateY: 10, rotateX: 5 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="relative flex flex-col h-full bg-white rounded-lg shadow-xl transform-style-preserve-3d hover:shadow-2xl"
            >
              <LiveProvider code={card.code}>
                <motion.div
                  className="h-[50vh] mb-4 bg-gradient-to-r from-blue-300 to-blue-200 relative overflow-hidden rounded-t-lg transform-style-preserve-3d"
                  initial={{ rotateY: -10, rotateX: 10 }}
                  animate={{ rotateY: 0, rotateX: 0 }}
                  whileHover={{ rotateY: 5, rotateX: 5 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <div className="absolute inset-0 text-neutral-950">
                    <LivePreview />
                  </div>
                </motion.div>
              </LiveProvider>

              {/* Bookmark button */}
              {bookmarkStates && bookmarkStates[card._id] ? (
                // Remove Bookmark button
                <motion.button
                  onClick={() => handleAddBookmark(card._id)}
                  className={`absolute z-10 p-2 text-white bg-green-500 rounded-full top-2 right-2 transition-transform duration-300 transform hover:scale-110`}
                  initial={{ opacity: 1 }}
                >
                  <div className="flex items-center space-x-2">
                    <IoBookmark className="text-xl md:text-3xl" />
                  </div>
                </motion.button>
              ) : (
                // Add Bookmark button
                <motion.button
                  onClick={() => handleAddBookmark(card._id)}
                  className={`absolute z-10 p-2 text-white bg-blue-500 rounded-full top-2 right-2 transition-all duration-300 transform hover:scale-110 hover:bg-blue-600`}
                  initial={{ opacity: 1 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
                  >
                    <IoBookmark className="text-xl md:text-3xl" />
                  </motion.div>
                </motion.button>

              )}

              <div className="flex items-center justify-between px-2 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 overflow-hidden rounded-full">
                    <motion.img
                      src={card.creatorAvatar || "https://dev-nexus.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FdevLogo.8d21b413.png&w=640&q=75"}
                      alt="User Image"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full rounded-full"
                      initial={{ rotateY: -10, rotateX: 10 }}
                      animate={{ rotateY: 0, rotateX: 0 }}
                      whileHover={{ rotate: 5 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    />
                  </div>
                  <div>
                    <motion.div
                      className="text-2xl font-semibold text-gray-800"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                      {card.title}
                    </motion.div>
                    <motion.p
                      className="text-sm text-gray-600"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1, ease: 'easeInOut' }}
                    >
                      Category {card.category}
                    </motion.p>
                  </div>
                </div>
                <Link href={`/component/${card._id}`}>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    initial={{ scale: 1, opacity: 0.9 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 py-2 text-white transition-transform duration-300 ease-in-out rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 hover:shadow-2xl focus:outline-none focus:ring focus:border-blue-300 transform-style-preserve-3d"
                  >
                    <div className="flex items-center space-x-2">
                      <motion.div
                        initial={{ scale: 0.8, rotateY: -10, rotateX: 10 }}
                        animate={{ scale: 1, rotateY: 0, rotateX: 0 }}
                        transition={{ yoyo: Infinity, duration: 1.5 }}
                      >
                        <FaCode className="text-3xl" />
                      </motion.div>
                      <span className="text-lg">Explore</span>
                    </div>
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div>No code components found for the specified category.</div>
      )}
    </>
  );
};

export default CompCategory;
