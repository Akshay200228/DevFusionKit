import { HiSearch } from 'react-icons/hi';
import Link from 'next/link';

export default function SearchBar() {
    return (
        <div className="flex items-center justify-between m-4">
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
            <Link href="/component/code-comp" className="px-4 py-2 ml-4 text-white bg-blue-500 rounded hover:bg-blue-600">
                + Create
            </Link>
        </div>
    );
}
