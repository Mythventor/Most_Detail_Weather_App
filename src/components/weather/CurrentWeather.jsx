import React from 'react';
import { 
  MapPin, 
  Thermometer, 
  Wind, 
  Eye, 
  Droplets, 
  Sun, 
  Cloud, 
  Gauge
} from 'lucide-react';
import { getWeatherDescription } from '/src/components/utils/weatherUtils.js';

/**
  Current Weather Component
 */
const CurrentWeather = ({ current, location, unitLabels, isDark }) => {
  if (!current) return null;

  return (
    <div className={`p-6 rounded-lg shadow-lg mb-6 transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-500 to-blue-700 text-white'
    }`}>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            {location}
          </h2>
          <p className={`transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-blue-100'
          }`}>
            Last updated:&nbsp;
            {new Date(current.time).toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold">
            {current.temperature_2m}{unitLabels.temp}
          </div>
          <div className={`transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-blue-100'
          }`}>
            Feels like {current.apparent_temperature}{unitLabels.temp}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`p-3 rounded transition-colors duration-300 ${
          isDark ? 'bg-gray-700' : 'bg-blue-600'
        }`}>
          <div className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-blue-100'
          }`}>
            <Droplets className="w-4 h-4" />
            Humidity
          </div>
          <div className="font-bold">{current.relative_humidity_2m}%</div>
        </div>

        <div className={`p-3 rounded transition-colors duration-300 ${
          isDark ? 'bg-gray-700' : 'bg-blue-600'
        }`}>
          <div className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-blue-100'
          }`}>
            <Wind className="w-4 h-4" />
            Wind Speed
          </div>
          <div className="font-bold">{current.wind_speed_10m} {unitLabels.wind}</div>
        </div>

        <div className={`p-3 rounded transition-colors duration-300 ${
          isDark ? 'bg-gray-700' : 'bg-blue-600'
        }`}>
          <div className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-blue-100'
          }`}>
            <Gauge className="w-4 h-4" />
            Pressure
          </div>
          <div className="font-bold">{current.pressure_msl} hPa</div>
        </div>

        <div className={`p-3 rounded transition-colors duration-300 ${
          isDark ? 'bg-gray-700' : 'bg-blue-600'
        }`}>
          <div className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-blue-100'
          }`}>
            <Cloud className="w-4 h-4" />
            Cloud Cover
          </div>
          <div className="font-bold">{current.cloud_cover}%</div>
        </div>
      </div>

      <div className={`mt-4 p-3 rounded transition-colors duration-300 ${
        isDark ? 'bg-gray-700' : 'bg-blue-600'
      }`}>
        <div className={`text-sm transition-colors duration-300 ${
          isDark ? 'text-gray-300' : 'text-blue-100'
        }`}>
          Current Conditions
        </div>
        <div className="font-bold">
          {getWeatherDescription(current.weather_code)}
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;