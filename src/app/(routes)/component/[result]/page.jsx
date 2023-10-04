"use client";
import { useEffect, useState } from 'react';
import { cardData } from '@/constants';
import { useRouter } from 'next/navigation';
import { RiArrowLeftLine } from 'react-icons/ri';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

export default function Result({ params }) {
    const router = useRouter();
    const cardId = parseInt(params.result);
    const initialCard = cardData.find((card) => card.id === cardId);
    const [card, setCard] = useState(initialCard);
    const [code, setCode] = useState(initialCard.code);
    const [isCodeCopied, setIsCodeCopied] = useState(false); // State to track if code is copied


    const handleGoBack = () => {
        router.back();
    };

    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };

    useEffect(() => {
        setCard({ ...card, code });
    }, [code]);

    const handleCopyCode = () => {
        navigator.clipboard.writeText(code)
            .then(() => {
                setIsCodeCopied(true);
                setTimeout(() => {
                    setIsCodeCopied(false);
                }, 3000);
            })
            .catch((error) => {
                console.error('Failed to copy code:', error);
            });
    };


    return (
        <div className="flex flex-col items-start justify-center p-6 bg-gray-100 lg:min-h-auto">
            {/* Buttons */}
            <div className="flex justify-between w-full p-4 mb-4">
                {/* "Go Back" button */}
                <button
                    onClick={handleGoBack}
                    className="flex items-center px-2 py-2 text-lg font-semibold text-blue-500 rounded-full hover:bg-blue-100"
                >
                    <RiArrowLeftLine className="mr-2" /> Go Back
                </button>

                {/* Copy button */}
                <button
                    onClick={handleCopyCode}
                    className={`px-4 py-2 text-white ${isCodeCopied ? 'bg-green-500' : 'bg-blue-500'} xl:mr-8 rounded-2xl`}
                >
                    {isCodeCopied ? 'Copied' : 'Copy'}
                </button>
            </div>

            {/* Card data */}
            {card ? (
                <div className="container p-4 bg-white rounded-lg shadow-lg lg:flex">
                    <LiveProvider code={code}>
                        <div className="lg:w-1/2">
                            {/* Show LivePreview */}
                            <div className="bg-blue-200">
                                <LivePreview />
                                <LiveError />
                            </div>
                        </div>
                        <div className="mt-6 lg:mt-0 lg:ml-6 lg:w-1/2">
                            {/* Live preview using react-live */}
                            <div className="h-[50vh] overflow-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-gray-200">
                                <div className='h-full'>
                                    <LiveEditor onChange={handleCodeChange} />
                                </div>
                            </div>
                        </div>
                    </LiveProvider>
                </div>
            ) : (
                <p className="text-2xl font-semibold text-red-600">Not found.</p>
            )}
        </div>
    );
}
