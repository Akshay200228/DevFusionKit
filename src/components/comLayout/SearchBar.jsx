"use client"

import { HiSearch } from 'react-icons/hi';
import Link from 'next/link';
import Container from "../homeLayout/Container";
import { useSearch } from '@/context/SearchContext';

export default function SearchBar() {
    const { searchQuery, handleSearch } = useSearch();

    const handleChange = (e) => {
        const value = e.target.value;
        handleSearch(value);
    };

    return (
        <Container>
            <div className="flex items-center justify-between">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by title"
                        value={searchQuery}
                        onChange={handleChange}
                        className="w-full py-2 pl-10 pr-4 text-gray-700 placeholder-gray-500 placeholder-opacity-75 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-600 focus:outline-none"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <HiSearch className="text-gray-400" />
                    </div>
                </div>

                <Link href="/code-comp" className="px-2 py-2 ml-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                    + Create
                </Link>
            </div>
        </Container>
    );
}