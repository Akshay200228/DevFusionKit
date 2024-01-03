"use client"

import { FaCode } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Link from 'next/link';
import useApiFetch from '@/hooks/useApiFetch';
import { TemplateCardsSkeleton } from '../SkeltonLoading';

export default function TemplateCards() {
  // const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL + "/api/web-templates" || "http://localhost:8000/api/web-templates/";
  // const apiUrl = "https://devnexus-server.onrender.com/api/web-templates/";
  const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL + "/api/web-templates/";
  const { data: templatesData, isLoading, error } = useApiFetch(apiUrl);

  return (
    <div className="px-4 mx-auto max-w-fit sm:px-6 lg:px-8">
      {isLoading ? (
        <TemplateCardsSkeleton count={12} />
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
                  <div className="flex justify-center mt-4">
                    <Link href={`/templates/${template._id}`}>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        initial={{ scale: 1, opacity: 0.9 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 py-2 text-white transition-transform duration-300 ease-in-out rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 hover:shadow-2xl focus:outline-none focus:ring focus:border-blue-300 transform-style-preserve-3d"
                      >
                        <div className="flex items-center space-x-2">
                          <motion.div
                            initial={{ scale: 0.8, rotateY: -10, rotateX: 10 }}
                            animate={{ scale: 1, rotateY: 0, rotateX: 0 }}
                            transition={{ yoyo: Infinity, duration: 1.5 }}
                          >
                            <FaCode className="text-3xl" />
                          </motion.div>
                          <span className="text-lg">Explore</span>
                        </div>
                      </motion.button>
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