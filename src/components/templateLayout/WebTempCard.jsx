// WebTempCard.jsx
import { motion } from 'framer-motion';
import { FaCode } from 'react-icons/fa';
import Link from 'next/link';

const stagger = 0.25;

const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};


const WebTempCard = ({ webtemp }) => {
    return (
      <motion.div
        key={webtemp._id}
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{
          delay: webtemp._id * stagger,
          ease: "easeInOut",
          duration: 0.5,
        }}
        // viewport={{ amount: 0 }}
        className="rounded-lg shadow-lg bg-blue-50"
      >
        <div className="relative h-96">
          <img
            src={webtemp.templateImage}
            alt={`Card Image ${webtemp._id}`}
            className="object-cover w-full h-full rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-900">{webtemp.title}</h2>
          <p className="mt-2 text-gray-500">{webtemp.description}</p>
  
          {/* Links */}
          <div className="flex justify-center mt-4">
            <Link href={`/templates/${webtemp._id}`}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 1, opacity: 0.9 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="px-6 py-2 text-white transition-transform duration-300 ease-in-out rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 hover:shadow-2xl focus:outline-none focus:ring focus:border-blue-300 transform-style-preserve-3d"
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
        </div>
      </motion.div>
    );
  };
  
  export default WebTempCard;
  