"use client"
// Breadcrumbs.js
import Link from 'next/link';
import { FaHome, FaChevronRight } from 'react-icons/fa';

const Breadcrumbs = ({ pathname }) => {
  const paths = pathname.split('/').filter((path) => path !== '');

  return (
    <div className="flex items-center mb-4 text-gray-500">
      <Link href="/" className="flex items-center text-blue-500 hover:underline">
        <FaHome className="mr-1" />
        Home
      </Link>
      {paths.length > 0 &&
        paths.map((path, index) => (
          <span key={index} className="flex items-center mx-2">
            <FaChevronRight />
            {index === paths.length - 1 ? (
              <span className="text-blue-500">{path}</span>
            ) : (
              <Link href={`/${paths.slice(0, index + 1).join('/')}`} className="text-blue-500 hover:underline">
                {path}
              </Link>
            )}
          </span>
        ))}
    </div>
  );
};

export default Breadcrumbs;
