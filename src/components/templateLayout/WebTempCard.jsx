// WebTempCard.jsx
import { motion } from 'framer-motion';
import { FaCode } from 'react-icons/fa';
import ExploreButton from '../Reusable-Comp/ExploreButton';

const stagger = 0.2;

const variants = {
  hidden: { opacity: 0, rotateX: -45, rotateY: -45, rotateZ: -45 },
  visible: { opacity: 1, rotateX: 0, rotateY: 0, rotateZ: 0 },
};

const WebTempCard = ({ webtemp, index }) => {
  const isStaggered = index > 0 && index % 12 !== 0; // Skip stagger for the first card and multiples of 12

  // Shorten the description to 34 characters
  const shortDescription = webtemp.description.substring(0, 34) + (webtemp.description.length > 34 ? '...' : '');

  return (
    <motion.div
      key={webtemp._id}
      variants={variants}
      initial={isStaggered ? "hidden" : "visible"}
      animate="visible"
      transition={{
        duration: 0.5,
        delay: isStaggered ? index * stagger : 0, // Apply stagger only if it's not the first card
        ease: "easeInOut",
      }}
      className="mx-4 rounded-lg bg-blue-50"
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
        <p className="mt-2 text-gray-500">{shortDescription}</p>

        {/* Links */}
        <div className="flex justify-center mt-4">
          <ExploreButton
            text="Explore"
            icon={<FaCode className="text-xl md:text-3xl" />}
            href={`/templates/${webtemp._id}`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default WebTempCard;
