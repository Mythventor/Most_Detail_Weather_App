import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WeatherApp from './components/WeatherApp';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [isDark, setIsDark] = useState(false);

  // Apply theme to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <Header isDark={isDark} />
      
      {/* Theme Toggle - Positioned in top right */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      </div>
      
      <WeatherApp isDark={isDark} />
      <Footer isDark={isDark} />
    </div>
  );
}

export default App;