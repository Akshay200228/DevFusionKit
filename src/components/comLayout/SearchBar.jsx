import { HiSearch } from 'react-icons/hi'

export default function SearchBar() {
    return (
        <>
            {/* Fixed Search Input */}
            <div className="flex items-center justify-center m-4">
                <div className="relative">
                    <input
                        type="text"
                        className="w-full py-2 pl-10 pr-4 text-gray-700 placeholder-gray-500 placeholder-opacity-75 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-600 focus:outline-none"
                        placeholder="Search"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <HiSearch className="text-gray-400" />
                    </div>
                </div>
            </div>
        </>
    )
}
