"use client"
import { Popover } from '@headlessui/react'
import Link from 'next/link';
import { useState } from 'react';

// Define an array of link objects
const links = [
    { href: '/component', text: 'All' },
    { href: '/component/accordion', text: 'Accordion' },
    { href: '/component/buttons', text: 'Buttons' },
    { href: '/component/cards', text: 'Cards' },
    { href: '/component/form', text: 'Form' },
    { href: '/component/inputs', text: 'Inputs' },
    { href: '/component/loaders', text: 'Loaders' },
    { href: '/component/toast', text: 'Toast' },
];

export default function Sidebar() {

    // Define a state variable to track the sidebar's visibility
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Function to toggle the sidebar's visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
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
                        <Popover.Panel
                            className={`fixed top-0 right-0 w-1/2 h-full bg-[#F5F5F5] overflow-y-auto ${open ? '' : 'hidden'
                                } md:block p-4`}
                        >
                            {/* Sidebar content */}
                            <ul className="font-serif text-xl font-bold">
                                {links.map((link, index) => (
                                    <li key={index} className="mb-2">
                                        <Link
                                            href={link.href}
                                            passHref
                                            className="block px-4 py-2 transition-colors rounded-lg hover:bg-gray-600 hover:text-white"
                                        >
                                            {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Popover.Panel>
                    </>
                )}
            </Popover>

            {/* Desktop Sidebar content */}
            <div className="p-4 w-52 bg-[#F5F5F5] hidden md:block">
                <ul className="font-serif text-xl font-bold">
                    {links.map((link, index) => (
                        <li key={index} className="mb-2">
                            <Link
                                href={link.href}
                                passHref
                                className="block px-4 py-2 transition-colors rounded-lg hover:bg-gray-600 hover:text-white"
                            >
                                {link.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
