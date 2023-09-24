"use client"
import { useEffect, useState } from 'react';
import { cardData } from '@/constants';
import Image from 'next/image';
import Popup from './Popup';
import CardSkeleton from './CardSkeleton';

export default function CardComponent() {
    const [popupData, setPopupData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const openPopup = (card) => {
        setPopupData(card);
    };

    const closePopup = () => {
        setPopupData(null);
    };

    const handleOutsideClick = (e) => {
        if (popupData && !e.target.closest('.popup-container')) {
            closePopup();
        }
    };

    useEffect(() => {
        if (popupData) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [popupData]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

    }, []);

    return (
        <>
            {/* Scrollable Cards */}
            <div className="w-full overflow-y-auto text-white scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-gray-300 scrollbar-thumb-rounded-full" style={{ maxHeight: 'calc(100vh - 80px)' }}>
                <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {isLoading ? ( 
                        // Display skeleton loading when isLoading is true
                        [...Array(cardData.length)].map((_, index) => (
                            <CardSkeleton key={index} />
                        ))
                    ) : (
                        cardData.map((card) => (
                            <div key={card.id} className="p-4 bg-white rounded-lg shadow-md h-96" onClick={() => openPopup(card)}>
                                <Image
                                    src={card.imageUrl}
                                    alt={`Card Image ${card.id}`}
                                    width={400}
                                    height={300}
                                    priority
                                    className="object-fill w-full mb-2 rounded-lg cursor-pointer h-60"
                                />
                                <h2 className="mb-2 text-xl font-semibold text-gray-600">{card.title}</h2>
                                <p className="text-gray-600">{card.content}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <Popup popupData={popupData} closePopup={closePopup} />
        </>
    );
}
