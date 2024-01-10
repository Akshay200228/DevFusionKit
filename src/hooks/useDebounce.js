// useDebounce.js
import { useEffect, useState } from 'react';

const useDebounce = (value, delay, onDebouncedValue) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value);
            onDebouncedValue(value); // Execute the callback
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [value, delay, onDebouncedValue]);

    return debouncedValue;
};

export default useDebounce;
