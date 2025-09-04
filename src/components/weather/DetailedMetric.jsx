import React from 'react';
import { Activity } from 'lucide-react';
import { formatDuration } from '/src/components/utils/weatherUtils.js';

/**
   Metrics Component
 */
const DetailedMetrics = ({ daily, current, unitLabels, isDark }) => {
  if (!daily || !current) return null;

  const todayIndex = 0; // First day

  const metricSections = [
    {
      title: '☀️ Solar Radiation',
      bgColor: isDark ? 'bg-orange-900 bg-opacity-30' : 'bg-orange-50',
      textColor: isDark ? 'text-orange-400' : 'text-orange-800',
      data: [
        { label: 'Shortwave', value: `${daily.shortwave_radiation_sum[todayIndex]} MJ/m²` },
        { label: 'UV Index', value: daily.uv_index_max[todayIndex] },
        { label: 'UV Clear Sky', value: daily.uv_index_clear_sky_max[todayIndex] }
      ]
    },
    {
      title: '💨 Wind Details',
      bgColor: isDark ? 'bg-blue-900 bg-opacity-30' : 'bg-blue-50',
      textColor: isDark ? 'text-blue-400' : 'text-blue-800',
      data: [
        { label: 'Max Speed', value: `${daily.wind_speed_10m_max[todayIndex]} ${unitLabels.wind}` },
        { label: 'Max Gusts', value: `${daily.wind_gusts_10m_max[todayIndex]} ${unitLabels.wind}` },
        { label: 'Direction', value: `${daily.wind_direction_10m_dominant[todayIndex]}°` },
        { label: 'Current', value: `${current.wind_direction_10m}°` }
      ]
    },
    {
      title: '💧 Precipitation',
      bgColor: isDark ? 'bg-green-900 bg-opacity-30' : 'bg-green-50',
      textColor: isDark ? 'text-green-400' : 'text-green-800',
      data: [
        { label: 'Rain Sum', value: `${daily.rain_sum[todayIndex]} ${unitLabels.precipitation}` },
        { label: 'Precipitation', value: `${daily.precipitation_sum[todayIndex]} ${unitLabels.precipitation}` },
        { label: 'Prob Max', value: `${daily.precipitation_probability_max[todayIndex]}%` },
        { label: 'Hours', value: `${daily.precipitation_hours[todayIndex]}h` }
      ]
    },
    {
      title: '🌅 Daylight Info',
      bgColor: isDark ? 'bg-yellow-900 bg-opacity-30' : 'bg-yellow-50',
      textColor: isDark ? 'text-yellow-400' : 'text-yellow-800',
      data: [
        { label: 'Daylight', value: formatDuration(daily.daylight_duration[todayIndex]) },
        { label: 'Sunshine', value: formatDuration(daily.sunshine_duration[todayIndex]) },
        { label: 'Sunrise', value: new Date(daily.sunrise[todayIndex]).toLocaleTimeString() },
        { label: 'Sunset', value: new Date(daily.sunset[todayIndex]).toLocaleTimeString() }
      ]
    },
    {
      title: '🌡️ Pressure & Humidity',
      bgColor: isDark ? 'bg-purple-900 bg-opacity-30' : 'bg-purple-50',
      textColor: isDark ? 'text-purple-400' : 'text-purple-800',
      data: [
        { label: 'Sea Level', value: `${current.pressure_msl} hPa` },
        { label: 'Surface', value: `${current.surface_pressure} hPa` },
        { label: 'Humidity', value: `${current.relative_humidity_2m}%` },
        { label: 'Evapotransp', value: `${daily.et0_fao_evapotranspiration[todayIndex]} mm` }
      ]
    },
    {
      title: '❄️ Winter Conditions',
      bgColor: isDark ? 'bg-red-900 bg-opacity-30' : 'bg-red-50',
      textColor: isDark ? 'text-red-400' : 'text-red-800',
      data: [
        { label: 'Snow Sum', value: `${daily.snowfall_sum[todayIndex]} ${unitLabels.distance}` },
        { label: 'Shower Sum', value: `${daily.showers_sum[todayIndex]} ${unitLabels.precipitation}` },
        { label: 'Current Snow', value: `${current.snowfall} ${unitLabels.distance}` },
        { label: 'Current Rain', value: `${current.rain} ${unitLabels.precipitation}` }
      ]
    }
  ];

  return (
    <div className={`p-6 rounded-lg shadow-lg mb-6 transition-colors duration-300 ${
      isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    }`}>
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5" />
        Detailed Meteorological Data
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metricSections.map((section) => (
          <MetricSection
            key={section.title}
            title={section.title}
            bgColor={section.bgColor}
            textColor={section.textColor}
            data={section.data}
            isDark={isDark}
          />
        ))}
      </div>
    </div>
  );
};


const MetricSection = ({ title, bgColor, textColor, data, isDark }) => {
  return (
    <div className={`p-4 rounded-lg transition-colors duration-300 ${bgColor}`}>
      <h4 className={`font-semibold mb-2 transition-colors duration-300 ${textColor}`}>
        {title}
      </h4>
      <div className="space-y-2 text-sm">
        {data.map((item, index) => (
          <MetricItem
            key={index}
            label={item.label}
            value={item.value}
            isDark={isDark}
          />
        ))}
      </div>
    </div>
  );
};


const MetricItem = ({ label, value, isDark }) => {
  return (
    <div className="flex justify-between items-center">
      <span className={`transition-colors duration-300 ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      }`}>
        {label}:
      </span>
      <span className={`font-medium transition-colors duration-300 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        {value}
      </span>
    </div>
  );
};

export default DetailedMetrics;