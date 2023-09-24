// CardSkeleton.js
import React from 'react';

const CardSkeleton = () => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md h-96 animate-pulse">
            <div className="w-full mb-2 bg-gray-300 rounded-lg h-60"></div>
            <div className="h-6 mb-2 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
        </div>
    );
};

export default CardSkeleton;
