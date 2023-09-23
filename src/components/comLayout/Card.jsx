"use client"
import { useState } from 'react';
import { cardData } from '@/constants';
import Image from 'next/image';
import close from "@/images/logos/close.svg"

export default function CardComponent() {
    const [popupData, setPopupData] = useState(null);

    const openPopup = (card) => {
        setPopupData(card);
    };

    const closePopup = () => {
        setPopupData(null);
    };

    return (
        <>
            {/* Scrollable Cards */}
            <div className="w-full overflow-y-auto text-white scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-gray-300 scrollbar-thumb-rounded-full" style={{ maxHeight: 'calc(100vh - 80px)' }}>
                <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {cardData.map((card) => (
                        <div key={card.id} className="p-4 bg-white rounded-lg shadow-md" onClick={() => openPopup(card)}>
                            <Image
                                src={card.imageUrl}
                                alt={`Card Image ${card.id}`}
                                width={400}
                                height={300}
                                priority
                                className="object-fill w-full h-40 mb-2 rounded-lg cursor-pointer"
                            />
                            <h2 className="mb-2 text-xl font-semibold text-gray-600">{card.title}</h2>
                            <p className="text-gray-600">{card.content}</p>
                        </div>
                    ))}
                </div>
            </div>

            {popupData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative flex flex-col max-w-4xl p-4 mx-4 bg-white rounded-lg md:flex-row">
                        <button
                            onClick={closePopup}
                            className="absolute top-2 right-2 md:hidden hover:text-gray-700 focus:outline-none"
                        >
                            <Image
                                src={close}
                                alt="Close"
                                width={24}
                                height={24}
                            />
                        </button>
                        <div className="relative flex-shrink-0 w-full md:w-2/5">
                            {/* Your image */}
                            <Image
                                src={popupData.imageUrl}
                                alt={`Popup Image`}
                                width={400}
                                height={300}
                                priority
                                className="object-fill w-full h-40 mb-2 rounded-lg cursor-pointer"
                            />
                        </div>
                        <div className="mt-4 ml-0 md:ml-4 md:mt-0">
                            <button
                                onClick={closePopup}
                                className="absolute hidden text-gray-500 md:block top-2 right-2 hover:text-gray-700 focus:outline-none"
                            >
                                <Image
                                    src={close}
                                    alt="Close"
                                    width={24}
                                    height={24}
                                />
                            </button>
                            <h2 className="mt-2 text-xl font-semibold">{popupData.title}</h2>
                            <p className="text-gray-600">{popupData.content}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
