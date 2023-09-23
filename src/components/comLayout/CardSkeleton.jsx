// CardSkeleton.js
import React from 'react';

const CardSkeleton = () => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md animate-pulse">
            <div className="w-full h-40 mb-2 bg-gray-300 rounded-lg"></div>
            <div className="h-6 mb-2 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
        </div>
    );
};

export default CardSkeleton;
