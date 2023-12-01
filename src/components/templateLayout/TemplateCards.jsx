"use client"

import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import Link from 'next/link';
import Loader from '../Loader';
import useApiFetch from '@/hooks/useApiFetch';

export default function TemplateCards() {
  const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL + "/api/code-templates" || "http://localhost:8000/api/code-templates/";
  console.log("URI", apiUrl)
  const { data: templatesData, isLoading, error } = useApiFetch(apiUrl);

  return (
    <div className="px-4 mx-auto max-w-fit sm:px-6 lg:px-8">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {
            templatesData.map((template) => (
              <div key={template._id} className="rounded-lg shadow-lg bg-blue-50">
                <div className="relative h-96">
                  <img
                    src={template.templateImage}
                    alt={`Card Image ${template._id}`}
                    className="object-cover w-full h-full rounded-t-lg"
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
                      <FiExternalLink />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      )}
    </div>
  )
}
