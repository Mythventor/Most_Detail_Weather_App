import React from 'react';
import { Calendar, Sunrise, Sunset } from 'lucide-react';
import { getWeatherDescription, formatTime, formatDate } from '/src/components/utils/weatherUtils.js';

/**
  Daily Forecast Component
 */
const DailyForecast = ({ daily, unitLabels, isDark }) => {
  if (!daily) return null;

  return (
    <div className={`p-6 rounded-lg shadow-lg mb-6 transition-colors duration-300 ${
      isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    }`}>
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        7-Day Forecast
      </h3>

      <div className="space-y-3">
        {daily.time.map((date, index) => (
          <ForecastItem
            key={date}
            date={date}
            index={index}
            daily={daily}
            unitLabels={unitLabels}
            isDark={isDark}
          />
        ))}
      </div>
    </div>
  );
};


const ForecastItem = ({ date, index, daily, unitLabels, isDark }) => {
  const weatherDescription = getWeatherDescription(daily.weather_code[index]);
  const maxTemp = daily.temperature_2m_max[index];
  const minTemp = daily.temperature_2m_min[index];
  const sunrise = daily.sunrise[index];
  const sunset = daily.sunset[index];

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-300 ${
      isDark ? 'bg-gray-700' : 'bg-gray-50'
    }`}>
      <div className="flex-1">
        <div className="font-semibold">
          {formatDate(date, { weekday: 'long', month: 'short', day: 'numeric' })}
        </div>
        <div className={`text-sm transition-colors duration-300 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {weatherDescription}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <Sunrise className="w-4 h-4 text-orange-500" />
          <span className={`transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {formatTime(sunrise)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Sunset className="w-4 h-4 text-orange-600" />
          <span className={`transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {formatTime(sunset)}
          </span>
        </div>

        <div className="text-right">
          <div className="font-bold">
            {maxTemp}{unitLabels.temp}
          </div>
          <div className={`text-sm transition-colors duration-300 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {minTemp}{unitLabels.temp}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyForecast;