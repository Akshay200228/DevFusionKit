"use client"

import { cardData } from '@/constants';

export default function Result({ params }) {
    // Parse params.result as an integer
    const cardId = parseInt(params.result);

    // Find the card with the matching ID
    const card = cardData.find((card) => card.id === cardId);

    return (
        <div className="flex items-start justify-center min-h-screen bg-gray-100">
            {/* Card data */}
            {card ? (
                <div className="container p-6 mx-2 mt-6 bg-white rounded-lg shadow-lg lg:flex">
                    <div className="lg:w-1/2">
                        <img
                            src={card.imageUrl}
                            alt={`Card Image ${card.id}`}
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                    <div className="mt-6 lg:mt-0 lg:ml-6 lg:w-1/2">
                        <h3 className="text-3xl font-semibold text-gray-800">{card.title}</h3>
                        <p className="mt-4 text-gray-700">{card.content}</p>
                    </div>
                </div>
            ) : (
                <p className="text-2xl font-semibold text-red-600">Card not found.</p>
            )}
        </div>
    );
}
