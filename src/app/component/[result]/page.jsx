"use client"

import { cardData } from '@/constants';

export default function Result({ params }) {
    // Parse params.result as an integer
    const cardId = parseInt(params.result);

    // Find the card with the matching ID
    const card = cardData.find((card) => card.id === cardId);

    return (
        <div className="flex items-center justify-center p-4 min-h-auto md:items-start sm:items-start md:pt-10">
            {/* Card data */}
            {card ? (
                <div className="flex flex-col w-full h-[768px] max-w-screen-lg mx-4 bg-white rounded-lg shadow-lg items-center md:items-start md:flex-row">
                    <div className="w-full md:w-1/2 h-96">
                        <img
                            src={card.imageUrl}
                            alt={`Card Image ${card.id}`}
                            className="w-full h-full p-4 rounded-lg"
                        />
                    </div>
                    <div className="w-full p-6 md:w-1/2">
                        <h3 className="mb-4 text-3xl font-semibold text-gray-800">{card.title}</h3>
                        <p className="mt-4 text-gray-700">{card.content}</p>
                    </div>
                </div>
            ) : (
                <p className="text-xl font-semibold text-red-600">Card not found.</p>
            )}
        </div>
    );
}
