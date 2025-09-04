import { WEATHER_CODES, UNIT_LABELS } from './constants.js';


export const getWeatherDescription = (code) => {
  return WEATHER_CODES[code] || "Unknown";
};


export const getUnitLabels = (units) => {
  return UNIT_LABELS[units] || UNIT_LABELS.metric;
};


export const formatDuration = (seconds) => {
  if (!seconds) return '0h 0m';
  
  const hours = Math.round(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);
  
  return `${hours}h ${minutes}m`;
};


export const formatTime = (timeString, options = {}) => {
  if (!timeString) return '';
  
  const defaultOptions = {
    hour: '2-digit',
    minute: '2-digit',
    ...options
  };
  
  return new Date(timeString).toLocaleTimeString('en-US', defaultOptions);
};


export const formatDate = (dateString, options = {}) => {
  if (!dateString) return '';
  
  const defaultOptions = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    ...options
  };
  
  return new Date(dateString).toLocaleDateString('en-US', defaultOptions);
};


export const degreesToCompass = (degrees) => {
  if (degrees === null || degrees === undefined) return 'N/A';
  
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", 
                     "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};


export const getUVIndexInfo = (uvIndex) => {
  if (uvIndex < 3) {
    return { category: 'Low', color: 'green', description: 'No protection needed' };
  } else if (uvIndex < 6) {
    return { category: 'Moderate', color: 'yellow', description: 'Some protection needed' };
  } else if (uvIndex < 8) {
    return { category: 'High', color: 'orange', description: 'Protection essential' };
  } else if (uvIndex < 11) {
    return { category: 'Very High', color: 'red', description: 'Extra protection needed' };
  } else {
    return { category: 'Extreme', color: 'purple', description: 'Avoid being outside' };
  }
};


export const isDaytime = (currentTime, sunrise, sunset) => {
  if (!currentTime || !sunrise || !sunset) return true;
  
  const current = new Date(currentTime);
  const sunriseTime = new Date(sunrise);
  const sunsetTime = new Date(sunset);
  
  return current >= sunriseTime && current <= sunsetTime;
};


export const getWeatherIcon = (code, isDay = true) => {
  const iconMap = {
    0: isDay ? '☀️' : '🌙', // Clear sky
    1: isDay ? '🌤️' : '🌙', // Mainly clear
    2: '⛅', // Partly cloudy
    3: '☁️', // Overcast
    45: '🌫️', // Fog
    48: '🌫️', // Depositing rime fog
    51: '🌦️', // Light drizzle
    53: '🌦️', // Moderate drizzle
    55: '🌦️', // Dense drizzle
    56: '🌨️', // Light freezing drizzle
    57: '🌨️', // Dense freezing drizzle
    61: '🌧️', // Slight rain
    63: '🌧️', // Moderate rain
    65: '🌧️', // Heavy rain
    66: '🌨️', // Light freezing rain
    67: '🌨️', // Heavy freezing rain
    71: '🌨️', // Slight snow fall
    73: '❄️', // Moderate snow fall
    75: '❄️', // Heavy snow fall
    77: '🌨️', // Snow grains
    80: '🌦️', // Slight rain showers
    81: '🌧️', // Moderate rain showers
    82: '⛈️', // Violent rain showers
    85: '🌨️', // Slight snow showers
    86: '❄️', // Heavy snow showers
    95: '⛈️', // Thunderstorm
    96: '⛈️', // Thunderstorm with slight hail
    99: '⛈️'  // Thunderstorm with heavy hail
  };
  
  return iconMap[code] || '❓';
};


export const getTemperatureCategory = (temp, unit = 'celsius') => {
  // Convert to Celsius
  const celsius = unit === 'fahrenheit' ? (temp - 32) * 5/9 : temp;
  
  if (celsius < 0) {
    return { category: 'Freezing', color: 'blue', description: 'Very cold' };
  } else if (celsius < 10) {
    return { category: 'Cold', color: 'lightblue', description: 'Cold' };
  } else if (celsius < 20) {
    return { category: 'Cool', color: 'green', description: 'Cool' };
  } else if (celsius < 25) {
    return { category: 'Comfortable', color: 'yellow', description: 'Pleasant' };
  } else if (celsius < 30) {
    return { category: 'Warm', color: 'orange', description: 'Warm' };
  } else {
    return { category: 'Hot', color: 'red', description: 'Very hot' };
  }
};