// Drawer.js
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Drawer = ({ text, children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDrawerOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    let timer;
    if (isDrawerOpen) {
      timer = setTimeout(() => {
        setIsDrawerOpen(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isDrawerOpen]);

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.8, borderColor: "transparent" }}
            animate={{ opacity: 1, y: 0, scale: 1, borderColor: "#3182ce" }}
            exit={{ opacity: 0, y: -10, scale: 0.8, borderColor: "transparent" }}
            transition={{ duration: 0.3, type: "spring", stiffness: 500, damping: 25 }}
            className="absolute p-2 mt-2 bg-blue-100 rounded-md shadow-md transform-translate-x-1/2 top-full left-1/2"
          >
            <p className="text-blue-600">{text}</p>
          </motion.div>

        )}
      </AnimatePresence>
    </div>
  );
};

export default Drawer;
