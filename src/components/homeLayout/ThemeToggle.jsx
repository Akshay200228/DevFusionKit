"use client"
// ThemeToggle.js
import { ThemeContext } from '@/app/ThemeContext';
import { useContext } from 'react';
import { HiSun, HiMoon } from 'react-icons/hi';

const ThemeToggle = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <div className='p-2'>
            {theme === 'dark' ? (
                <div className='flex items-center cursor-pointer' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                    <HiMoon className='mr-2 text-2xl text-primary' />Dark Mood
                </div>
            ) : (
                <div className='flex items-center text-gray-300 cursor-pointer' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                    <HiSun className='mr-2 text-2xl text-yellow-300' />Light Mode
                </div>
            )}
        </div>
    );
};

export default ThemeToggle;
