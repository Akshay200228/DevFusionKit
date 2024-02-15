'use client';

import React from 'react';
import CountUp from "react-countup";
import { motion } from 'framer-motion';
import { statistics } from "@/constants";

const CountBar = () => {
    const fadeInUpVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
    };

    const scaleVariants = {
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
    };

    return (
        <motion.div
            className='flex flex-wrap items-start justify-start w-full gap-16'
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
        >
            {statistics.map(({ label, value, info }, index) => (
                <motion.div
                    key={label}
                    className="flex flex-col items-center justify-center"
                    whileHover="hover"
                    whileTap="tap"
                    variants={scaleVariants}
                    style={{
                        width: '150px',
                        borderRadius: '10px',
                        boxShadow: 'inset 0px 0px 20px rgba(0, 0, 0, 0.1)', 
                        padding: '20px',
                        backgroundColor: '#fff',
                    }}
                >
                    {/* Value */}
                    <div className="flex items-center justify-center">
                        <CountUp
                            start={0} end={value} duration={4}
                            className={`text-4xl font-bold font-palanquin`}
                        /> <span className='text-[38px] font-semibold font-palanquin text-blue-500'>+</span>
                    </div>
                    {/* Label */}
                    <p className={`leading-7 font-montserrat text-slate-gray mt-2 text-center`}>{label}</p>
                </motion.div>
            ))}
        </motion.div>
    )
}

export default CountBar;
