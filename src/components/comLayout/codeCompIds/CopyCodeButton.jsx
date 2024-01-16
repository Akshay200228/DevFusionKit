// CopyCodeButton.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/homeLayout/Button';
import { IoMdCopy } from 'react-icons/io';
import { FaRegCheckCircle } from 'react-icons/fa';

const CopyCodeButton = ({ onCopy, isCopySuccess }) => {
  const [icon, setIcon] = useState(<IoMdCopy className='text-3xl' />);
  const [bgColor, setBgColor] = useState('bg-white');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (isCopySuccess) {
      setIcon(<FaRegCheckCircle className='text-3xl' />);
      setBgColor('bg-green-500 text-white');
      setShowNotification(true);

      // Reset the background color and icon after 3 seconds
      setTimeout(() => {
        setIcon(<IoMdCopy className='text-3xl' />);
        setBgColor('bg-white backdrop-blur-0 hover:bg-blue-50');
        setShowNotification(false);
      }, 3000);
    }
  }, [isCopySuccess]);

  const handleCopyCode = () => {
    // Call the onCopy callback provided by the parent component (CodeDisplay)
    onCopy();
  };

  return (
    <Button
      onClick={handleCopyCode}
      variant="blueOutline"
      color="outline"
      className={`text-blue-500 transition duration-300 border border-blue-500 relative ${bgColor}`}
    >
      <motion.div whileHover={{ scale: 1.1 }} className="flex items-center">
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="p-2 mr-2 text-white bg-green-500 rounded-md"
            >
              Copied
            </motion.div>
          )}
        </AnimatePresence>
        {icon}
      </motion.div>
    </Button>
  );
};

export default CopyCodeButton;
