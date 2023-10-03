"use client";
import { cardData } from '@/constants';
import { useRouter } from 'next/navigation';
import { RiArrowLeftLine } from 'react-icons/ri';


export default function Result({ params }) {
    const router = useRouter();

    // Parse params.result as an integer
    const cardId = parseInt(params.result);

    // Find the card with the matching ID
    const card = cardData.find((card) => card.id === cardId);

    const handleGoBack = () => {
        router.back(); // Navigate back to the previous page
    };

    return (
        <div className="flex flex-col items-start justify-center p-6 bg-gray-100 lg:min-h-auto">
            {/* "Go Back" button */}
            <button
                onClick={handleGoBack}
                className="flex items-center px-2 py-2 mb-4 text-lg font-semibold text-blue-500 rounded-full hover:bg-blue-100"
            >
                <RiArrowLeftLine className="mr-2" /> Go Back
            </button>

            {/* Card data */}
            {card ? (
                <div className="container p-4 bg-white rounded-lg shadow-lg lg:flex">
                    <div className="lg:w-1/2">
                        <iframe
                            src={card.preview}
                            frameBorder="0"
                            scrolling="no"
                            className="w-full h-[50vh] lg:h-[80vh] rounded-lg"
                        />
                    </div>
                    <div className="mt-6 lg:mt-0 lg:ml-6 lg:w-1/2">
                        <h3 className="text-3xl font-semibold text-gray-800">{card.title}</h3>
                        <p className="mt-4 text-gray-700">{card.content}</p>
                    </div>
                </div>
            ) : (
                <p className="text-2xl font-semibold text-red-600">Not found.</p>
            )}
        </div>
    );
}
