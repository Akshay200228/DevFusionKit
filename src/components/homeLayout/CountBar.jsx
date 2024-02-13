'use client';
import CountUp from "react-countup";
import { motion } from 'framer-motion';
import { statistics } from "@/constants";

const CountBar = () => {
    const fadeInUpVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
    };

    return (
        <motion.div
            className='flex flex-wrap items-start justify-start w-full gap-16'
            variants={fadeInUpVariants}
        >
            {statistics.map(({ label, value, info }, index) => (
                <motion.div
                    key={label}
                    initial="hidden"
                    animate="visible"
                    variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 1, ease: "easeOut" } } }}
                    className="flex flex-col items-center justify-center"
                >
                    {/* Value */}
                    <div className="flex items-center justify-center">
                        <CountUp
                            start={0} end={value} duration={4}
                            className={`text-4xl font-bold font-palanquin text-coral-red`}
                        /> <span className='text-[38px] font-semibold font-palanquin text-gray-400'>+</span>
                    </div>
                    {/* Label */}
                    <p className={`leading-7 font-montserrat text-slate-gray mt-2`}>{label}</p>
                    {/* Information */}
                </motion.div>
            ))}
        </motion.div>
    )
}

export default CountBar;
