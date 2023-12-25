import { Popover } from '@headlessui/react'
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

// Define an array of link objects
const links = [
    { href: '/component', text: 'All' },
    { href: '/component/categories/Accordion', text: 'Accordion' },
    { href: '/component/categories/Button', text: 'Buttons' },
    { href: '/component/categories/Card', text: 'Cards' },
    { href: '/component/categories/Carousel', text: 'Carousel' },
    { href: '/component/categories/Form', text: 'Form' },
    { href: '/component/categories/Input', text: 'Inputs' },
    { href: '/component/categories/Loader', text: 'Loaders' },
    { href: '/component/categories/Toast', text: 'Toast' },
];

export default function Sidebar() {

    const pathname = usePathname();

    // Define a state variable to track the sidebar's visibility
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Function to toggle the sidebar's visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <>
            <Popover className="relative z-50">
                {({ open }) => (
                    <>
                        {/* Toggle Button at the bottom */}
                        <Popover.Button
                            className={`fixed p-2 text-white bg-blue-500 md:hidden bottom-4 left-4 rounded-full ${isSidebarOpen ? 'rotate-90' : ''}`}
                            onClick={toggleSidebar}
                        >
                            <div className="flex items-center p-2">
                                <div className="w-8 h-8">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        {isSidebarOpen ? (
                                            <path d="M6 18L18 6M6 6l12 12"></path>
                                        ) : (
                                            <path d="M4 6h16M4 12h16M4 18h16"></path>
                                        )}
                                    </svg>
                                </div>
                            </div>
                        </Popover.Button>

                        {/* Popover Content */}
                        <AnimatePresence>
                            {open && (
                                <motion.div
                                    className="fixed top-0 right-0 w-2/3 h-full p-4 overflow-y-auto bg-white md:block"
                                    initial={{ opacity: 0, translateX: '100%' }}
                                    animate={{ opacity: 1, translateX: '0%' }}
                                    exit={{ opacity: 0, translateX: '100%' }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Sidebar content */}
                                    <ul className="font-serif text-xl font-bold">
                                        {links.map((link, index) => {
                                            const isActive = pathname === link.href; // Check if the link is active
                                            return (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0, translateX: '50%' }}
                                                    animate={{ opacity: 1, translateX: '0%' }}
                                                    exit={{ opacity: 0, translateX: '50%' }}
                                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                                    className="mb-2"
                                                >
                                                    <Link
                                                        href={link.href}
                                                        passHref
                                                        className={`block px-4 py-2 transition-colors rounded-lg hover:bg-gray-600 hover:text-white ${isActive ? 'bg-blue-500 text-white' : ''
                                                            }`}
                                                        onClick={() => {
                                                            console.log(link.text)
                                                            closeSidebar();
                                                        }}
                                                    >
                                                        {link.text}
                                                    </Link>
                                                </motion.li>
                                            );
                                        })}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </Popover>

            {/* Desktop Sidebar content */}
            <div className="hidden p-4 bg-white w-72 md:block">
                <ul className="font-serif text-xl font-bold">
                    {links.map((link, index) => {
                        const isActive = pathname === link.href; // Check if the link is active
                        return (
                            <li key={index} className="mb-2">
                                <Link
                                    href={link.href}
                                    passHref
                                    className={`block px-4 py-2 transition-colors rounded-lg hover:bg-blue-100 hover:text-blue-700 ${isActive ? 'bg-blue-500 text-white' : ''}`}
                                >
                                    {link.text}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    )
}