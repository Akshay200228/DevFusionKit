import { FaCode } from 'react-icons/fa';
import { LivePreview, LiveProvider } from 'react-live';
import Link from 'next/link';

const CodeComponent = ({ title, code, componentId }) => (
    <div className="mb-6">
        <div className="p-2 bg-white border rounded-lg shadow-md">
            <h4 className="mb-1 text-lg font-semibold text-blue-600">{title}</h4>
            <div className="h-[40vh] bg-blue-200 relative overflow-hidden rounded-lg">
                <LiveProvider code={code}>
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-950">
                        <LivePreview />
                    </div>
                </LiveProvider>
            </div>
            <div className="flex justify-center mt-2 md:mt-4">
                <Link href={`/component/${componentId}`}>
                    <button className="px-4 py-2 text-white transition-transform duration-300 ease-in-out bg-blue-500 rounded-full hover:bg-blue-600">
                        <FaCode className="text-xl md:text-3xl" />
                    </button>
                </Link>
            </div>
        </div>
    </div>
);

export default CodeComponent;
