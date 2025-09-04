import React from 'react';
import Logo from '/src/asset/ChatGPT_Weather_Logo.svg';

const Header = ({ isDark }) => {
  return (
    <header
      className={`p-4 shadow-lg transition-colors duration-300 ${
        isDark
          ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white'
          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
      }`}
    >
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center">
          <span className="inline-flex items-center justify-center gap-3 align-middle">
            <img
              src={Logo}
              alt="Most Detailed Weather App Logo"
              className="h-8 w-8 align-middle shrink-0"
              decoding="async"
            />
            <span className="leading-tight">
             Most Detailed Weather Application
            </span>
          </span>
        </h1>
        <p
          className={`text-center mt-2 transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-blue-100'
          }`}
        >
          Comprehensive meteorological data at your fingertips
        </p>
      </div>
    </header>
  );
};

export default Header;