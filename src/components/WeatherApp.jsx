import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  Thermometer, 
  Wind, 
  Eye, 
  Droplets, 
  Sun, 
  Cloud, 
  Gauge,
  Activity,
  Sunrise,
  Sunset,
  Calendar,
  Clock
} from 'lucide-react';

const formatLocationName = (locationData) => {
  if (!locationData) return 'Unknown Location';
  
  // Debug log
  console.log('Location data:', locationData);
  
  if (locationData.address) {
    const city = locationData.address.city || 
                 locationData.address.town || 
                 locationData.address.village || 
                 locationData.address.hamlet ||
                 locationData.address.municipality ||
                 locationData.address.suburb;
    
    const state = locationData.address.state;
    const country = locationData.address.country;
    const countryCode = locationData.address.country_code;
    
    if (city) {
      // For US locations, use state abbreviation
      if (country === 'United States' || countryCode === 'us') {
        if (state) {
          const stateAbbr = getStateAbbreviation(state);
          return `${city}, ${stateAbbr || state}`;
        }
        return city;
      } else {
        if (state && !isPostalCode(state)) {
          return `${city}, ${state}`;
        } else if (country) {
          return `${city}, ${country}`;
        } else {
          return city;
        }
      }
    }
  }
  
  if (locationData.display_name) {
    const parts = locationData.display_name.split(',').map(part => part.trim());
    
    if (parts.length >= 2) {
      const city = parts[0];
      
      const country = parts[parts.length - 1];
      
      const stateOrRegion = parts.length >= 3 ? parts[parts.length - 2] : null;
      
      if (country === 'United States' || country === 'US') {
        if (stateOrRegion && !isPostalCode(stateOrRegion)) {
          const stateAbbr = getStateAbbreviation(stateOrRegion);
          return `${city}, ${stateAbbr || stateOrRegion}`;
        }
        return city;
      } else {
        return `${city}, ${country}`;
      }
    }
    return parts[0];
  }
  
  return 'Unknown Location';
};

const isPostalCode = (str) => {
  if (!str) return false;
  return /^\d+$/.test(str) || /^\d{5}(-\d{4})?$/.test(str) || /^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(str);
};

const getStateAbbreviation = (stateName) => {
  const states = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
    'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
    'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
    'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
    'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
    'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
    'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
    'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
    'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
    'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY'
  };
  return states[stateName];
};

// Weather Code 
const getWeatherDescription = (code) => {
  const codes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail"
  };
  return codes[code] || "Unknown";
};

// Current Weather Component
const CurrentWeather = ({ current, location, unitLabels, isDark }) => {
  if (!current) return null;

  return (
    <div className={`p-6 rounded-lg shadow-lg mb-6 transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-500 to-blue-700 text-white'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            {location}
          </h2>
          <p className={`transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-blue-100'
          }`}>
            {new Date(current.time).toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold">{current.temperature_2m}{unitLabels.temp}</div>
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
        <div className="font-bold">{getWeatherDescription(current.weather_code)}</div>
      </div>
    </div>
  );
};

// Daily Forecast Component
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
          <div key={date} className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-300 ${
            isDark ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="flex-1">
              <div className="font-semibold">
                {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </div>
              <div className={`text-sm transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {getWeatherDescription(daily.weather_code[index])}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Sunrise className="w-4 h-4 text-orange-500" />
                {new Date(daily.sunrise[index]).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Sunset className="w-4 h-4 text-orange-600" />
                {new Date(daily.sunset[index]).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="text-right">
                <div className="font-bold">{daily.temperature_2m_max[index]}{unitLabels.temp}</div>
                <div className={`text-sm transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {daily.temperature_2m_min[index]}{unitLabels.temp}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Detailed Metrics Component
const DetailedMetrics = ({ daily, current, unitLabels, isDark }) => {
  if (!daily || !current) return null;

  const today = daily.time[0];
  const todayIndex = 0;

  return (
    <div className={`p-6 rounded-lg shadow-lg mb-6 transition-colors duration-300 ${
      isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    }`}>
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5" />
        Detailed Meteorological Data
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className={`p-4 rounded-lg transition-colors duration-300 ${
          isDark ? 'bg-orange-900 bg-opacity-30' : 'bg-orange-50'
        }`}>
          <h4 className={`font-semibold mb-2 transition-colors duration-300 ${
            isDark ? 'text-orange-400' : 'text-orange-800'
          }`}>☀️ Solar Radiation</h4>
          <div className="space-y-2 text-sm">
            <div>Shortwave: {daily.shortwave_radiation_sum[todayIndex]} MJ/m²</div>
            <div>UV Index: {daily.uv_index_max[todayIndex]}</div>
            <div>UV Clear Sky: {daily.uv_index_clear_sky_max[todayIndex]}</div>
          </div>
        </div>

        <div className={`p-4 rounded-lg transition-colors duration-300 ${
          isDark ? 'bg-blue-900 bg-opacity-30' : 'bg-blue-50'
        }`}>
          <h4 className={`font-semibold mb-2 transition-colors duration-300 ${
            isDark ? 'text-blue-400' : 'text-blue-800'
          }`}>💨 Wind Details</h4>
          <div className="space-y-2 text-sm">
            <div>Max Speed: {daily.wind_speed_10m_max[todayIndex]} {unitLabels.wind}</div>
            <div>Max Gusts: {daily.wind_gusts_10m_max[todayIndex]} {unitLabels.wind}</div>
            <div>Direction: {daily.wind_direction_10m_dominant[todayIndex]}°</div>
            <div>Current: {current.wind_direction_10m}°</div>
          </div>
        </div>

        <div className={`p-4 rounded-lg transition-colors duration-300 ${
          isDark ? 'bg-green-900 bg-opacity-30' : 'bg-green-50'
        }`}>
          <h4 className={`font-semibold mb-2 transition-colors duration-300 ${
            isDark ? 'text-green-400' : 'text-green-800'
          }`}>💧 Precipitation</h4>
          <div className="space-y-2 text-sm">
            <div>Rain Sum: {daily.rain_sum[todayIndex]} {unitLabels.precipitation}</div>
            <div>Precipitation: {daily.precipitation_sum[todayIndex]} {unitLabels.precipitation}</div>
            <div>Prob Max: {daily.precipitation_probability_max[todayIndex]}%</div>
            <div>Hours: {daily.precipitation_hours[todayIndex]}h</div>
          </div>
        </div>

        <div className={`p-4 rounded-lg transition-colors duration-300 ${
          isDark ? 'bg-yellow-900 bg-opacity-30' : 'bg-yellow-50'
        }`}>
          <h4 className={`font-semibold mb-2 transition-colors duration-300 ${
            isDark ? 'text-yellow-400' : 'text-yellow-800'
          }`}>🌅 Daylight Info</h4>
          <div className="space-y-2 text-sm">
            <div>Daylight: {Math.round(daily.daylight_duration[todayIndex] / 3600)}h {Math.round((daily.daylight_duration[todayIndex] % 3600) / 60)}m</div>
            <div>Sunshine: {Math.round(daily.sunshine_duration[todayIndex] / 3600)}h {Math.round((daily.sunshine_duration[todayIndex] % 3600) / 60)}m</div>
            <div>Sunrise: {new Date(daily.sunrise[todayIndex]).toLocaleTimeString()}</div>
            <div>Sunset: {new Date(daily.sunset[todayIndex]).toLocaleTimeString()}</div>
          </div>
        </div>

        <div className={`p-4 rounded-lg transition-colors duration-300 ${
          isDark ? 'bg-purple-900 bg-opacity-30' : 'bg-purple-50'
        }`}>
          <h4 className={`font-semibold mb-2 transition-colors duration-300 ${
            isDark ? 'text-purple-400' : 'text-purple-800'
          }`}>🌡️ Pressure & Humidity</h4>
          <div className="space-y-2 text-sm">
            <div>Sea Level: {current.pressure_msl} hPa</div>
            <div>Surface: {current.surface_pressure} hPa</div>
            <div>Humidity: {current.relative_humidity_2m}%</div>
            <div>Evapotransp: {daily.et0_fao_evapotranspiration[todayIndex]} mm</div>
          </div>
        </div>

        <div className={`p-4 rounded-lg transition-colors duration-300 ${
          isDark ? 'bg-red-900 bg-opacity-30' : 'bg-red-50'
        }`}>
          <h4 className={`font-semibold mb-2 transition-colors duration-300 ${
            isDark ? 'text-red-400' : 'text-red-800'
          }`}>❄️ Winter Conditions</h4>
          <div className="space-y-2 text-sm">
            <div>Snow Sum: {daily.snowfall_sum[todayIndex]} {unitLabels.distance}</div>
            <div>Shower Sum: {daily.showers_sum[todayIndex]} {unitLabels.precipitation}</div>
            <div>Current Snow: {current.snowfall} {unitLabels.distance}</div>
            <div>Current Rain: {current.rain} {unitLabels.precipitation}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Location Search Component
const LocationSearch = ({ onLocationSelect, isDark }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://geocode.maps.co/search?q=${encodeURIComponent(searchTerm)}&api_key=68a919781b2de745501207ovz01fbca`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const location = data[0];
        
        let locationName = formatLocationName(location);
        
        onLocationSelect({
          lat: parseFloat(location.lat),
          lon: parseFloat(location.lon),
          name: locationName
        });
      } else {
        alert('Location not found');
      }
    } catch (error) {
      console.error('Error searching location:', error);
      alert('Error searching location');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGPSLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=68a919781b2de745501207ovz01fbca`
          );
          const data = await response.json();
          
          let locationName = 'Current Location';
          if (data && data.address) {
            const city = data.address.city || data.address.town || data.address.village || data.address.hamlet;
            const state = data.address.state;
            
            if (city && state) {
              const stateAbbr = getStateAbbreviation(state);
              locationName = `${city}, ${stateAbbr || state}`;
            } else if (city) {
              locationName = city;
            } else if (data.display_name) {
              locationName = data.display_name.split(',')[0];
            }
          }
          
          onLocationSelect({
            lat: latitude,
            lon: longitude,
            name: locationName
          });
        } catch (error) {
          console.error('Error reverse geocoding:', error);
          onLocationSelect({
            lat: latitude,
            lon: longitude,
            name: 'Current Location'
          });
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        setIsLoading(false);
        console.error('Geolocation error:', error);
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            alert('Location access denied. Please enable location permissions and try again.');
            break;
          case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            alert('Location request timed out.');
            break;
          default:
            alert('An unknown error occurred while getting your location.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
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
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 transition-colors duration-300"
            aria-label="Search for weather by location"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
          <button
            onClick={handleGPSLocation}
            disabled={isLoading}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2 transition-colors duration-300"
            aria-label="Use GPS to get current location weather"
          >
            <MapPin className="w-4 h-4" />
            GPS
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Weather App Component
const WeatherApp = ({ isDark }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState({ lat: 41.8, lon: -87, name: 'Chicago, IL' });
  const [isLoading, setIsLoading] = useState(false);
  const [units, setUnits] = useState('metric');

  const fetchWeatherData = async (lat, lon) => {
    setIsLoading(true);
    try {
      // Base URL
      let apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,rain_sum,showers_sum,snowfall_sum,precipitation_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&hourly=temperature_2m,weather_code,wind_direction_10m,wind_speed_10m,cloud_cover,precipitation,rain,temperature_80m,soil_temperature_6cm,shortwave_radiation,direct_radiation,diffuse_radiation,direct_normal_irradiance,global_tilted_irradiance,terrestrial_radiation,shortwave_radiation_instant,direct_radiation_instant,diffuse_radiation_instant,direct_normal_irradiance_instant,global_tilted_irradiance_instant,terrestrial_radiation_instant&models=best_match&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&timezone=auto`;
      
      if (units === 'imperial') {
        apiUrl += '&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch';
      }
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Error fetching weather data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = (newLocation) => {
    setLocation(newLocation);
    fetchWeatherData(newLocation.lat, newLocation.lon);
  };

  const handleUnitToggle = () => {
    const newUnits = units === 'metric' ? 'imperial' : 'metric';
    setUnits(newUnits);
    setWeatherData(null); 
  };

  const getUnitLabels = () => {
    return {
      temp: units === 'metric' ? '°C' : '°F',
      wind: units === 'metric' ? 'km/h' : 'mph',
      precipitation: units === 'metric' ? 'mm' : 'in',
      distance: units === 'metric' ? 'cm' : 'in'
    };
  };

  useEffect(() => {
    fetchWeatherData(location.lat, location.lon);
  }, []);

  const unitLabels = getUnitLabels();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 text-center">
        <button
          onClick={handleUnitToggle}
          className={`px-6 py-3 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto ${
            isDark
              ? 'bg-purple-700 hover:bg-purple-600 text-white'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          <Gauge className="w-4 h-4" />
          Switch to {units === 'metric' ? 'Imperial' : 'Metric'} Units
          <span className={`transition-colors duration-300 ${
            isDark ? 'text-purple-300' : 'text-purple-200'
          }`}>
            ({units === 'metric'  ? '°F, mph, inches' : '°C, km/h, mm'})
          </span>
        </button>
        {weatherData && (
          <p className={`mt-2 text-sm transition-colors duration-300 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Currently showing: {units === 'metric' ? 'Metric' : 'Imperial'} units
          </p>
        )}
      </div>

      <LocationSearch onLocationSelect={handleLocationSelect} isDark={isDark} />
      
      {!weatherData && !isLoading && (
        <div className={`border-l-4 p-4 mb-6 transition-colors duration-300 ${
          isDark 
            ? 'bg-yellow-900 bg-opacity-30 border-yellow-500 text-yellow-300' 
            : 'bg-yellow-50 border-yellow-400 text-yellow-700'
        }`}>
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm">
                <strong>Units changed!</strong> Please search for a location or use GPS to get weather data in {units} units.
              </p>
            </div>
          </div>
        </div>
      )}
      
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

      {weatherData && !isLoading && (
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
          <DetailedMetrics 
            daily={weatherData.daily} 
            current={weatherData.current} 
            unitLabels={unitLabels} 
            isDark={isDark}
          />
        </>
      )}
    </main>
  );
};

export default WeatherApp;