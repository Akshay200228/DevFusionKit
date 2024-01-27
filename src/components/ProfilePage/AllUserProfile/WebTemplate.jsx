import Link from 'next/link';
import { FaCode } from 'react-icons/fa';

const WebTemplate = ({ templateImage, title, templateId }) => (
    <div className="mb-4">
        <div className="p-2 bg-white border rounded-lg shadow-md">
            <img
                src={templateImage}
                alt="templateImage"
                className="object-cover w-full mb-4 rounded-md aspect-w-16 aspect-h-9 h-96"
            />
            <h4 className="mb-2 text-xl font-semibold">{title}</h4>
            <div className="flex items-center justify-center mt-4">
                <Link href={`/templates/${templateId}`}>
                    <button
                        className="px-6 py-2 text-white transition-transform duration-300 ease-in-out rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 hover:shadow-2xl focus:outline-none focus:ring focus:border-blue-300 transform-style-preserve-3d"
                    >
                        <div className="flex items-center space-x-2">
                            <FaCode className="text-3xl" />
                            <span className="text-lg">Explore</span>
                        </div>
                    </button>
                </Link>
            </div>
        </div>
    </div>
);

export default WebTemplate;

