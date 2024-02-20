import { FaCode } from 'react-icons/fa';
import { LivePreview, LiveProvider } from 'react-live';
import Link from 'next/link';
import ExploreButton from '@/components/Reusable-Comp/ExploreButton';

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
                <ExploreButton
                    text="Explore"
                    icon={<FaCode className="text-xl md:text-3xl" />}
                    href={`/component/${componentId}`}
                />
            </div>
        </div>
    </div>
);

export default CodeComponent;
