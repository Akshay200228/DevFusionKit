'use client';
import { motion } from "framer-motion";

const CommingSoon = () => {
  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-r from-blue-300 to-blue-200">
            <motion.div
                className="relative flex flex-col items-center justify-center w-full h-full"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
            >
                <motion.h1
                    className="mb-4 text-4xl font-bold text-slate-900"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.8, ease: 'easeInOut' }}
                >
                    <motion.span
                        className="inline-block"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.5, ease: 'easeInOut' }}
                    >
                        🚀
                    </motion.span>{" "}
                    Coming soon...
                </motion.h1>
                <motion.p
                    className="text-lg text-slate-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8, ease: 'easeInOut' }}
                >
                    <motion.span
                        className="inline-block"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.7, duration: 0.5, ease: 'easeInOut' }}
                    >
                        Stay tuned for exciting updates!
                    </motion.span>
                </motion.p>
            </motion.div>
        </div>
  )
}

export default CommingSoon
