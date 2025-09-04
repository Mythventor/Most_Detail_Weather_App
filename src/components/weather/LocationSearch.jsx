import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { useLocationSearch } from '/src/components/hooks/useWeather.js';

/**
  Location Search Component
  Handles location search and GPS functionality
 */
const LocationSearch = ({ onLocationSelect, isDark }) => {
  const {
    searchTerm,
    setSearchTerm,
    isSearching,
    searchError,
    search,
    getCurrentLocation,
    clearSearch
  } = useLocationSearch();

  const handleSearch = async () => {
    await search(onLocationSelect);
  };

  const handleGPSLocation = async () => {
    await getCurrentLocation(onLocationSelect);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`p-4 rounded-lg shadow-lg mb-6 transition-colors duration-300 ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="location-search" className="sr-only">
            Search for location by city, state, or postal code
          </label>
          <input
            id="location-search"
            type="text"
            placeholder="Enter city, state, or postal code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 transition-colors duration-300"
            aria-label="Search for weather by location"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
          
          <button
            onClick={handleGPSLocation}
            disabled={isSearching}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2 transition-colors duration-300"
            aria-label="Use GPS to get current location weather"
          >
            <MapPin className="w-4 h-4" />
            GPS
          </button>
        </div>
      </div>

      {searchError && (
        <div className={`mt-3 p-3 rounded-lg transition-colors duration-300 ${
          isDark 
            ? 'bg-red-900 bg-opacity-30 text-red-300' 
            : 'bg-red-50 text-red-700'
        }`}>
          <div className="flex justify-between items-center">
            <p className="text-sm">
              <strong>Error:</strong> {searchError}
            </p>
            <button 
              onClick={clearSearch}
              className={`text-sm underline ${
                isDark ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'
              }`}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;