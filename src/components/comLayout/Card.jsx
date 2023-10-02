"use client";
import { useEffect, useState } from 'react';
import { cardData } from '@/constants';
import Image from 'next/image';
import CardSkeleton from './CardSkeleton';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CardComponent() {
    const [isLoading, setIsLoading] = useState(true);
    const [cardsToShow, setCardsToShow] = useState(9);
    const [showLoadMore, setShowLoadMore] = useState(false); // Initially set to false
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            setShowLoadMore(true); // Show the "Load More" button after initial loading
        }, 2000);
    }, []);

    const loadMore = () => {
        setLoadingMore(true);
        setTimeout(() => {
            setCardsToShow(cardsToShow + 9);
            setLoadingMore(false);

            if (cardsToShow + 9 >= cardData.length) {
                setShowLoadMore(false);
            }
        }, 2000);
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
                        cardData.slice(0, cardsToShow).map((card) => (
                            <Link key={card.id} href={`/component/${card.id}`}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="p-4 bg-white rounded-lg shadow-xl h-96"
                                >
                                    <iframe
                                        src={card.preview}
                                        // src="https://card-test.akshaysankpal.repl.co"
                                        frameBorder="0"
                                        scrolling="no"
                                        className="object-fill w-full mb-4 rounded-lg h-60"
                                    ></iframe>
                                    <h2 className="mb-2 text-xl font-semibold text-gray-600">{card.title}</h2>
                                    <p className="text-gray-600">{card.content}</p>
                                </motion.div>
                            </Link>
                        ))
                    )}
                    {loadingMore && (
                        [...Array(9)].map((_, index) => (
                            <CardSkeleton key={index} />
                        ))
                    )}
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
                            {loadingMore ? "Loading..." : "Load More"}
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </>
    );
}