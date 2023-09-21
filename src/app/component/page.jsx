"use client"
import { cardData } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Component() {
  // Define a state variable to track the sidebar's visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar's visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-auto">
      {/* Left Sidebar */}
      <div
        className={`${isSidebarOpen ? 'block' : 'hidden'
          } md:block p-4 w-52 bg-slate-400`}
      >
        <ul className='font-serif text-xl font-bold'>
          <li className="mb-2">
            <Link
              href="/component"
              className="block px-4 py-2 transition-colors rounded-lg hover:bg-gray-600 hover:text-white"
            >
              All
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/component/buttons"
              className="block px-4 py-2 transition-colors rounded-lg hover:bg-gray-600 hover:text-white"
            >
              Buttons
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/component/cards"
              className="block px-4 py-2 transition-colors rounded-lg hover:bg-gray-600 hover:text-white"
            >
              Cards
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/component/form"
              className="block px-4 py-2 transition-colors rounded-lg hover:bg-gray-600 hover:text-white"
            >
              Form
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/component/toggle"
              className="block px-4 py-2 transition-colors rounded-lg hover:bg-gray-600 hover:text-white"
            >
              Toggle
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/component/loaders"
              className="block px-4 py-2 transition-colors rounded-lg hover:bg-gray-600 hover:text-white"
            >
              Loaders
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/component/inputs"
              className="block px-4 py-2 transition-colors rounded-lg hover:bg-gray-600 hover:text-white"
            >
              Inputs
            </Link>
          </li>
        </ul>
      </div>

      {/* Toggle Button at the bottom */}
      <button
        className={`fixed p-2 text-white bg-blue-500 md:hidden bottom-4 left-4 rounded-full ${isSidebarOpen ? 'rotate-90' : ''
          }`}
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
      </button>


      {/* Right Showcase Work */}
      <div
        className="w-full overflow-y-auto text-white bg-slate-300 scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-gray-300 scrollbar-thumb-rounded-full"
        style={{ maxHeight: 'calc(100vh - 80px)' }}
      >
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {cardData.map((card) => (
            <div key={card.id} className="p-4 bg-white rounded-lg shadow-md">
              <Image
                src={card.imageUrl}
                alt={`Card Image ${card.id}`}
                width={400}
                height={300}
                className="object-fill w-full h-40 mb-2 rounded-lg"
              />
              <h2 className="mb-2 text-xl font-semibold">{card.title}</h2>
              <p className="text-gray-600">{card.content}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
