"use client"

import { motion } from 'framer-motion';

// Transition component with framer motion and simplified 3D animation
export default function Template({ children }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.75 }}
    >
      {children}
    </motion.div>
  );
}

// import { motion } from 'framer-motion';
// import { AnimatePresence } from "framer-motion";
// import { usePathname } from "next/navigation";

// export default function TransitionProvider({ children }) {
//   const pathName = usePathname();

//   return (
//     <AnimatePresence mode="wait">
//       <div
//         key={pathName}
//       >
//         <motion.div
//           className="h-screen w-screen fixed bg-black rounded-b-[100px] z-40"
//           animate={{ height: "0vh" }}
//           exit={{ height: "140vh" }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//         />
//         <motion.div
//           className="fixed top-0 bottom-0 left-0 right-0 z-50 m-auto text-white cursor-default text-8xl w-fit h-fit"
//           initial={{ opacity: 1 }}
//           animate={{ opacity: 0 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//         >
//           {pathName.substring(1)}
//         </motion.div>
//         <motion.div
//           className="h-screen w-screen fixed bg-black rounded-t-[100px] bottom-0 z-30"
//           initial={{ height: "140vh" }}
//           animate={{ height: "0vh", transition: { delay: 0.5 } }}
//         />
//         <div className="">{children}</div>
//       </div>
//     </AnimatePresence>
//   );
// }
