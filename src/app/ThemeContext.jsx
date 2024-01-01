"use client"
// ThemeContext.js
import { createContext, useEffect, useState } from 'react';

const getInitialTheme = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const storedPrefs = window.localStorage.getItem('color-theme');
        if (typeof storedPrefs === 'string') {
            return storedPrefs;
        }
        const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
        if (userMedia.matches) {
            return 'dark';
        }
    }
    return 'light';
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ initialTheme, children }) => {
    const [theme, setTheme] = useState(initialTheme || getInitialTheme());

    const rawSetTheme = (newTheme) => {
        const root = window.document.documentElement;
        const isDark = newTheme === 'dark';
        root.classList.remove(isDark ? 'light' : 'dark');
        root.classList.add(newTheme);
        localStorage.setItem('color-theme', newTheme);
    };

    useEffect(() => {
        console.log('Theme updated:', theme);
        rawSetTheme(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
