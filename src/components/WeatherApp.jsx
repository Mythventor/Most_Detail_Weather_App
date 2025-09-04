import React, { useState } from 'react';
import { Gauge, Activity } from 'lucide-react';
import { useWeather } from '/src/components/hooks/useWeather.js';
import CurrentWeather from '/src/components/weather/CurrentWeather.jsx';
import DailyForecast from '/src/components/weather/DailyForecast.jsx';
import DetailedMetrics from '/src/components/weather/DetailedMetric.jsx';
import LocationSearch from '/src/components/weather/LocationSearch.jsx';

/**
  Main Weather App Component 
 */
const WeatherApp = ({ isDark }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const {
    weatherData,
    location,
    isLoading,
    units,
    error,
    unitLabels,
    hasData,
    isMetric,
    handleLocationSelect,
    toggleUnits,
    clearError
  } = useWeather();

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 text-center">
        <button
          onClick={toggleUnits}
          className={`px-6 py-3 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto ${
            isDark
              ? 'bg-purple-700 hover:bg-purple-600 text-white'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          <Gauge className="w-4 h-4" />
          Switch to {isMetric ? 'Imperial' : 'Metric'} Units
          <span className={`transition-colors duration-300 ${
            isDark ? 'text-purple-300' : 'text-purple-200'
          }`}>
            ({isMetric ? '°F, mph, inches' : '°C, km/h, mm'})
          </span>
        </button>
        {hasData && (
          <p className={`mt-2 text-sm transition-colors duration-300 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Currently showing: {isMetric ? 'Metric' : 'Imperial'} units
          </p>
        )}
      </div>

      <LocationSearch 
        onLocationSelect={handleLocationSelect} 
        isDark={isDark} 
      />
      
      {error && (
        <div className={`border-l-4 p-4 mb-6 transition-colors duration-300 ${
          isDark 
            ? 'bg-red-900 bg-opacity-30 border-red-500 text-red-300' 
            : 'bg-red-50 border-red-400 text-red-700'
        }`}>
          <div className="flex justify-between items-center">
            <p className="text-sm">
              <strong>Error:</strong> {error}
            </p>
            <button 
              onClick={clearError}
              className={`text-sm underline ${
                isDark ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'
              }`}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {!weatherData && !isLoading && !error && (
        <div className={`border-l-4 p-4 mb-6 transition-colors duration-300 ${
          isDark 
            ? 'bg-yellow-900 bg-opacity-30 border-yellow-500 text-yellow-300' 
            : 'bg-yellow-50 border-yellow-400 text-yellow-700'
        }`}>
          <p className="text-sm">
            <strong>Units changed!</strong> Please search for a location or use GPS to get weather data in {units} units.
          </p>
        </div>
      )}
      
      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className={`inline-block animate-spin rounded-full h-8 w-8 border-b-2 transition-colors duration-300 ${
            isDark ? 'border-purple-400' : 'border-blue-600'
          }`}></div>
          <p className={`mt-2 transition-colors duration-300 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Loading weather data...
          </p>
        </div>
      )}

      {hasData && (
        <>
          <CurrentWeather 
            current={weatherData.current} 
            location={location.name} 
            unitLabels={unitLabels} 
            isDark={isDark}
          />
          <DailyForecast 
            daily={weatherData.daily} 
            unitLabels={unitLabels} 
            isDark={isDark}
          />
          
          <div className="mb-6 text-center">
            <button
              onClick={toggleAdvanced}
              className={`px-6 py-3 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto ${
                showAdvanced
                  ? isDark
                    ? 'bg-red-700 hover:bg-red-600 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                  : isDark
                    ? 'bg-indigo-700 hover:bg-indigo-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <Activity className="w-4 h-4" />
              {showAdvanced ? 'Hide Advanced Data' : 'Show Advanced Data'}
              <span className={`text-sm transition-colors duration-300 ${
                showAdvanced 
                  ? isDark ? 'text-red-300' : 'text-red-200'
                  : isDark ? 'text-indigo-300' : 'text-indigo-200'
              }`}>
                ({showAdvanced ? 'Simple view' : 'Detailed metrics'})
              </span>
            </button>
          </div>

          {showAdvanced && (
            <DetailedMetrics 
              daily={weatherData.daily} 
              current={weatherData.current} 
              unitLabels={unitLabels} 
              isDark={isDark}
            />
          )}
        </>
      )}
    </main>
  );
};

export default WeatherApp;