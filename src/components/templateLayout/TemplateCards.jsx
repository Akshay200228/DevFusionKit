"use client"

import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import Link from 'next/link';
import Loader from '../Loader';
import useApiFetch from '@/hooks/useApiFetch';

export default function TemplateCards() {
<<<<<<< HEAD
  const apiUrl = "http://localhost:8000/api/code-templates";
  const { data: templatesData, isLoading, error } = useApiFetch(apiUrl);
=======
  const [templatesData, setTemplatesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC || 'https://devnexus-server.onrender.com';
        const response = await axios.get(`${apiUrl}/api/code-templates`);
        if (response.status === 200) {
          setTemplatesData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
>>>>>>> e59a4bb147f6aba4932e9f1951b25755f9c30795

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
              <div key={template.id} className="rounded-lg shadow-lg bg-blue-50">
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
