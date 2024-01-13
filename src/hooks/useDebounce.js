// useDebouncedSearch.js
import { useEffect, useState } from 'react';

const useDebouncedSearch = (initialValue = '', delay = 300, onDebounce) => {
    const [searchQuery, setSearchQuery] = useState(initialValue);
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(initialValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
            if (onDebounce) {
                onDebounce(searchQuery);
            }
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery, delay, onDebounce]);

    const handleSearch = (value) => {
        setSearchQuery(value);
    };

    return { searchQuery: debouncedSearchQuery, handleSearch };
};

export default useDebouncedSearch;
