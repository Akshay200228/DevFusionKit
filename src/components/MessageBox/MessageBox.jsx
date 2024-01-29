import { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineMessage } from "react-icons/ai";

const MessageBox = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative hidden rounded-xl lg:block">
      <AiOutlineMessage
        onClick={toggleDropdown}
        className="p-0.5 w-10 h-10 text-blue-600 cursor-pointer"
      />
      {/* {isDropdownOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute right-0 w-64 p-2 mt-2 bg-white border border-gray-300 rounded-md shadow-md"
        >
          <p className="mb-2 font-bold">Recent Messages:</p>
          <ul className="list-none">
            <motion.li whileHover={{ scale: 1.05 }} className="mb-1 cursor-pointer">
              Message 1
            </motion.li>
            <motion.li whileHover={{ scale: 1.05 }} className="mb-1 cursor-pointer">
              Message 2
            </motion.li>
            <motion.li whileHover={{ scale: 1.05 }} className="cursor-pointer">
              Message 3
            </motion.li>
          </ul>
        </motion.div>
      )} */}
    </div>
  );
};

export default MessageBox;