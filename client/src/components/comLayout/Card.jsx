"use client";
import { useEffect, useState } from 'react';
import { cardData } from '@/constants';
import { FaCode } from 'react-icons/fa';
import CardSkeleton from './CardSkeleton';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { LivePreview, LiveProvider } from 'react-live';

export default function CardComponent() {
    const batchSize = 9;
    const [isLoading, setIsLoading] = useState(true);
    const [cardsToShow, setCardsToShow] = useState(batchSize);
    const [showLoadMore, setShowLoadMore] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);

    // Simulate loading effect
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            setShowLoadMore(true);
        }, 2000);
    }, []);

    // Handle mouse enter event on a card
    const handleMouseEnter = (cardId) => {
        setHoveredCard(cardId);
    };

    // Handle mouse leave event on a card
    const handleMouseLeave = () => {
        setHoveredCard(null);
    };

    // Load more cards when the "Load More" button is clicked
    const loadMore = () => {
        setLoadingMore(true);
        setTimeout(() => {
            setCardsToShow((prevCount) => prevCount + batchSize);
            setLoadingMore(false);

            if (cardsToShow + batchSize >= cardData.length) {
                setShowLoadMore(false);
            }
        }, 2000);
    };

    const getNextBatchSkeletons = () => {
        const remainingCards = cardData.slice(cardsToShow, cardsToShow + batchSize);
        return remainingCards.map((_, index) => (
            <CardSkeleton key={index} />
        ));
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
                    {isLoading ? (
                        [...Array(cardsToShow)].map((_, index) => (
                            <CardSkeleton key={index} />
                        ))
                    ) : (
                        cardData
                            .filter((card) => card.code) // Filter out cards without a code
                            .slice(0, cardsToShow)
                            .map((card) => (
                                <motion.div
                                    key={card.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col h-full p-4 bg-white rounded-lg shadow-xl"
                                >
                                    <LiveProvider code={card.code}>
                                        <div className="h-[50vh] mb-10 bg-blue-200 relative">
                                            <div className="absolute inset-0">
                                                <LivePreview />
                                            </div>
                                        </div>
                                    </LiveProvider>

                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center">
                                            <Image
                                                src={card.userImg}
                                                alt="User Image"
                                                width={36}
                                                height={36}
                                                className="mr-4 rounded-full"
                                            />
                                            <h2 className="text-xl font-semibold text-gray-600">{card.userName}</h2>
                                        </div>
                                        <Link
                                            href={`/component/${card.id}`}
                                            className={`p-2 text-blue-400 rounded-full hover:bg-blue-200 ${hoveredCard === card.id ? 'pl-4 flex items-center' : ''}`}
                                            onMouseEnter={() => handleMouseEnter(card.id)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            {hoveredCard === card.id ? (
                                                <>
                                                    <span className="mr-2 text-blue-800">View More</span>
                                                    <FaCode className="ml-2 text-4xl " />
                                                </>
                                            ) : (
                                                <FaCode className="text-4xl" />
                                            )}
                                        </Link>
                                    </div>
                                </motion.div>
                            ))
                    )}

                    {loadingMore && getNextBatchSkeletons()}
                </motion.div>

                {showLoadMore && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-center"
                    >
                        <button
                            onClick={loadMore}
                            className={`px-4 py-2 mt-4 text-white bg-blue-500 rounded-full hover:bg-blue-600 ${loadingMore ? 'hidden' : ''}`}
                            disabled={loadingMore}
                        >
                            {loadingMore ? 'Loading...' : 'Load More'}
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </>
    );
}
