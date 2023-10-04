"use client"

import Image from 'next/image'; // Import next/image
import { FaCode, FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import { templatesData } from '@/constants';

export default function TemplateCards() {
  return (
    <div className="px-4 mx-auto max-w-fit sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {templatesData.map((template) => (
            <div key={template.id} className="rounded-lg shadow-lg bg-blue-50">
              <div className="relative h-96"> 
                <Image
                  src={template.imageUrl}
                  alt={`Card Image ${template.id}`}
                  layout="fill" 
                  objectFit="fill" 
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900">{template.title}</h2>
                <p className="mt-2 text-gray-500">{template.description}</p>

                {/* Links */}
                <div className="flex justify-between mt-4">
                  <Link
                    href={template.githubLink}
                    target='_blank'
                    className="flex items-center p-3 text-2xl text-blue-400 rounded-full lg:hover:bg-blue-100"
                  >
                    <FaGithub />
                  </Link>

                  <Link
                    href={template.deployLink}
                    target='_blank'
                    className="flex items-center p-3 text-2xl text-blue-400 rounded-full lg:hover:bg-blue-100"
                  >
                    <FaCode /> 
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}
