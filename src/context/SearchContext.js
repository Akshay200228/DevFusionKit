"use client";
// SearchContext.js
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Check if the current page is not 1, then navigate to page 1
    if (query.page !== '1') {
      router.push(`/component?page=1`);
    }
  };

  return (
    <SearchContext.Provider value={{ searchQuery, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};