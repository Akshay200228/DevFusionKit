"use client";
import { useState } from 'react';
import { cardData } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CardComponent() {
    const initialCardsToShow = 9; // Initially show 9 cards
    const [cardsToShow, setCardsToShow] = useState(initialCardsToShow);

    const loadMore = () => {
        // Calculate the number of cards to load
        const nextCardsToShow = cardsToShow + 9;

        // Limit to a maximum of the total number of available cards
        const maxCardsToShow = Math.min(nextCardsToShow, cardData.length);

        // Set the number of cards to show
        setCardsToShow(maxCardsToShow);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full pt-10 overflow-y-auto text-white scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-gray-300 scrollbar-thumb-rounded-full"
                style={{ maxHeight: 'calc(100vh - 80px)' }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="grid grid-cols-1 gap-8 p-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
                >
                    {cardData.slice(0, cardsToShow).map((card) => (
                        <Link key={card.id} href={`/component/${card.id}`}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="p-4 bg-white rounded-lg shadow-xl h-96"
                            >
                                <Image
                                    src={card.imageUrl}
                                    alt={`Card Image ${card.id}`}
                                    width={400}
                                    height={300}
                                    priority
                                    className="object-fill w-full mb-4 rounded-lg h-60"
                                />
                                <h2 className="mb-2 text-xl font-semibold text-gray-600">{card.title}</h2>
                                <p className="text-gray-600">{card.content}</p>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
                {cardsToShow < cardData.length && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-center"
                    >
                        <button
                            onClick={loadMore}
                            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-full hover:bg-blue-600"
                        >
                            Load More
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </>
    );
}
