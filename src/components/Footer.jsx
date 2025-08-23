import React from 'react';

const Footer = ({ isDark }) => {
  return (
    <footer className={`p-4 mt-8 transition-colors duration-300 ${
      isDark 
        ? 'bg-gray-900 text-gray-300' 
        : 'bg-gray-800 text-white'
    }`}>
      <div className="container mx-auto text-center">
        <p>CS 396 - Mengpang Xing</p>
      </div>
    </footer>
  );
};

export default Footer;