"use client"

import { cardData } from '@/constants';

export default function Result({ params }) {
    // Parse params.result as an integer
    const cardId = parseInt(params.result);

    // Find the card with the matching ID
    const card = cardData.find((card) => card.id === cardId);

    // Placeholder for additional data (you can replace this with your data)
    const additionalData = {
        title: 'Additional Data Title',
        description: 'Additional data description goes here.',
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-gray-100 min-h-auto">
            {/* Card data */}
            {card ? (
                <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">
                    <h3 className="mb-4 text-3xl font-semibold text-gray-800">{card.title}</h3>
                    <img
                        src={card.imageUrl}
                        alt={`Card Image ${card.id}`}
                        className="w-full h-auto rounded-lg"
                    />
                    <p className="mt-4 text-gray-700">{card.content}</p>

                    {/* Additional data */}
                    <div className="mt-6">
                        <h3 className="mb-2 text-2xl font-semibold text-gray-800">{additionalData.title}</h3>
                        <p className="text-gray-700">{additionalData.description}</p>
                    </div>
                </div>
            ) : (
                <p className="text-xl font-semibold text-red-600">Card not found.</p>
            )}
        </div>
    );
}
