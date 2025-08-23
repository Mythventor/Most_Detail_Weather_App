import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg transition-all duration-300
        ${isDark 
          ? 'bg-yellow-500 hover:bg-yellow-400 text-black' 
          : 'bg-gray-800 hover:bg-gray-700 text-white'
        }
      `}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <>
          <Sun className="w-4 h-4" />
          <span className="hidden sm:inline">Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4" />
          <span className="hidden sm:inline">Dark Mode</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;