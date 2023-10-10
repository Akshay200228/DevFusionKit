import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { navData } from "@/constants";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      {navData.map(({ _id, title, href }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={_id}
            href={href}
            className={`relative px-3 py-2 -mx-3 -my-2 text-base text-gray-700 transition-colors rounded-lg hover:text-gray-900 ${isActive ? 'border-b-8 border-blue-500' : ''}`}
            onMouseEnter={() => setHoveredIndex(_id)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === _id && (
                <motion.span
                  className="absolute inset-0 bg-gray-100 rounded-lg"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <span className="relative z-10">{title}</span>
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
