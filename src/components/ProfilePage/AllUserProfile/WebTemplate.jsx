import ExploreButton from '@/components/Reusable-Comp/ExploreButton';
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
                <ExploreButton
                    text="Explore"
                    icon={<FaCode className="text-xl" />}
                    href={`/templates/${templateId}`}
                />
            </div>
        </div>
    </div>
);

export default WebTemplate;

