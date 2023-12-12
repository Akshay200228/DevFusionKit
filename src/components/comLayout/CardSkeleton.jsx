// Updated CardSkeleton.js

const CardSkeleton = () => {
    return (
        <div className="grid grid-cols-1 gap-8 p-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((index) => (
                <div key={index} className="h-full p-4 bg-white rounded-lg shadow-xl transform-style-preserve-3d">
                    <div className="h-[50vh] mb-4 bg-gray-300 rounded-lg"></div>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 overflow-hidden bg-gray-300 rounded-full"></div>
                            <div>
                                <div className="h-6 mb-1 bg-gray-300 rounded"></div>
                                <div className="h-4 bg-gray-300 rounded"></div>
                            </div>
                        </div>
                        <div className="px-4 py-2 text-white rounded-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardSkeleton;
