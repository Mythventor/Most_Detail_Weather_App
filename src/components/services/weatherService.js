import { API_ENDPOINTS, WEATHER_PARAMS, GEOLOCATION_OPTIONS } from '../utils/constants.js';
import { formatLocationName, formatReverseGeocodedLocation, validateCoordinates } from '../utils/locationUtils.js';


export const fetchWeatherData = async (lat, lon, units = 'metric') => {
  if (!validateCoordinates(lat, lon)) {
    throw new Error('Invalid coordinates provided');
  }

  try {
    // API URL
    let apiUrl = `${API_ENDPOINTS.WEATHER}?latitude=${lat}&longitude=${lon}`;
    
    //  weather parameters
    apiUrl += `&daily=${WEATHER_PARAMS.DAILY.join(',')}`;
    apiUrl += `&hourly=${WEATHER_PARAMS.HOURLY.join(',')}`;
    apiUrl += `&current=${WEATHER_PARAMS.CURRENT.join(',')}`;
    apiUrl += '&models=best_match&timezone=auto';
    
    //  unit-specific parameters
    if (units === 'imperial') {
      apiUrl += '&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch';
    }
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(`Weather API error: ${data.reason || 'Unknown error'}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};



export const searchLocations = async (searchTerm) => {
  if (!searchTerm || !searchTerm.trim()) {
    throw new Error('Search term is required');
  }

  try {
    const response = await fetch(
      `${API_ENDPOINTS.GEOCODE}/search?q=${encodeURIComponent(searchTerm)}&api_key=${API_ENDPOINTS.GEOCODE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error('Invalid response format from geocoding API');
    }
    
    return data.map(location => ({
      lat: parseFloat(location.lat),
      lon: parseFloat(location.lon),
      name: formatLocationName(location),
      raw: location 
    }));
  } catch (error) {
    console.error('Error searching locations:', error);
    throw error;
  }
};



export const reverseGeocode = async (lat, lon) => {
  if (!validateCoordinates(lat, lon)) {
    throw new Error('Invalid coordinates provided');
  }

  try {
    const response = await fetch(
      `${API_ENDPOINTS.GEOCODE}/reverse?lat=${lat}&lon=${lon}&api_key=${API_ENDPOINTS.GEOCODE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Reverse geocoding API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return formatReverseGeocodedLocation(data, lat, lon);
  } catch (error) {
    console.error('Error reverse geocoding:', error);

    return {
      lat,
      lon,
      name: 'Current Location'
    };
  }
};



export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          const locationInfo = await reverseGeocode(latitude, longitude);
          resolve(locationInfo);
        } catch (error) {
          resolve({
            lat: latitude,
            lon: longitude,
            name: 'Current Location'
          });
        }
      },
      (error) => {
        let errorMessage = 'An error occurred while getting your location.';
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location permissions and try again.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        
        reject(new Error(errorMessage));
      },
      GEOLOCATION_OPTIONS
    );
  });
};



export class WeatherService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 10 * 60 * 1000; // 10 minutes
  }


  getCacheKey(lat, lon, units) {
    return `weather_${lat.toFixed(2)}_${lon.toFixed(2)}_${units}`;
  }


  isCacheValid(cachedData) {
    if (!cachedData) return false;
    return Date.now() - cachedData.timestamp < this.cacheTimeout;
  }

  async getWeatherData(lat, lon, units = 'metric') {
    const cacheKey = this.getCacheKey(lat, lon, units);
    const cachedData = this.cache.get(cacheKey);
    
    if (this.isCacheValid(cachedData)) {
      console.log('Returning cached weather data');
      return cachedData.data;
    }
    
    try {
      const data = await fetchWeatherData(lat, lon, units);
      
      // Cache data
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
      
      return data;
    } catch (error) {
      if (cachedData) {
        console.warn('Using expired cache due to API error:', error);
        return cachedData.data;
      }
      throw error;
    }
  }

  /**
   Clears the weather data cache
   */
  clearCache() {
    this.cache.clear();
  }


  
  async searchLocations(searchTerm) {
    return searchLocations(searchTerm);
  }


  
  async getCurrentLocation() {
    return getCurrentLocation();
  }
}

export const weatherService = new WeatherService();