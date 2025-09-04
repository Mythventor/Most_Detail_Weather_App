import { useState, useEffect, useCallback } from 'react';
import { weatherService } from '../services/weatherService.js';
import { DEFAULT_LOCATION, UNIT_SYSTEMS } from '../utils/constants.js';
import { getUnitLabels } from '../utils/weatherUtils.js';


export const useWeather = (options = {}) => {
  const { 
    initialLocation = DEFAULT_LOCATION, 
    initialUnits = UNIT_SYSTEMS.METRIC 
  } = options;

  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(initialLocation);
  const [isLoading, setIsLoading] = useState(false);
  const [units, setUnits] = useState(initialUnits);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);


  const fetchWeatherData = useCallback(async (lat, lon) => {
    if (!lat || !lon) {
      setError('Invalid coordinates provided');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await weatherService.getWeatherData(lat, lon, units);
      setWeatherData(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(err.message || 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, [units]);


  const handleLocationSelect = useCallback(async (newLocation) => {
    if (!newLocation || typeof newLocation.lat !== 'number' || typeof newLocation.lon !== 'number') {
      setError('Invalid location data provided');
      return;
    }

    setLocation(newLocation);
    await fetchWeatherData(newLocation.lat, newLocation.lon);
  }, [fetchWeatherData]);


  const searchLocations = useCallback(async (searchTerm) => {
    if (!searchTerm || !searchTerm.trim()) {
      throw new Error('Search term is required');
    }

    setError(null);
    
    try {
      const results = await weatherService.searchLocations(searchTerm);
      return results;
    } catch (err) {
      console.error('Error searching locations:', err);
      setError(err.message || 'Failed to search locations');
      throw err;
    }
  }, []);


  const getCurrentLocation = useCallback(async () => {
    setError(null);
    
    try {
      const currentLocation = await weatherService.getCurrentLocation();
      await handleLocationSelect(currentLocation);
      return currentLocation;
    } catch (err) {
      console.error('Error getting current location:', err);
      setError(err.message || 'Failed to get current location');
      throw err;
    }
  }, [handleLocationSelect]);


  const toggleUnits = useCallback(() => {
    const newUnits = units === UNIT_SYSTEMS.METRIC ? UNIT_SYSTEMS.IMPERIAL : UNIT_SYSTEMS.METRIC;
    setUnits(newUnits);
    setWeatherData(null);
  }, [units]);


  const refreshWeatherData = useCallback(async () => {
    if (location.lat && location.lon) {
      await fetchWeatherData(location.lat, location.lon);
    }
  }, [location, fetchWeatherData]);


  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setWeatherData(null);
    setLocation(initialLocation);
    setUnits(initialUnits);
    setError(null);
    setLastUpdated(null);
    setIsLoading(false);
  }, [initialLocation, initialUnits]);

  useEffect(() => {
    if (location.lat && location.lon && !weatherData) {
      fetchWeatherData(location.lat, location.lon);
    }
  }, [units, location.lat, location.lon, weatherData, fetchWeatherData]);

  useEffect(() => {
    if (location.lat && location.lon && !weatherData && !isLoading) {
      fetchWeatherData(location.lat, location.lon);
    }
  }, []); 


  const unitLabels = getUnitLabels(units);
  const hasData = weatherData && !isLoading;
  const isImperial = units === UNIT_SYSTEMS.IMPERIAL;
  const isMetric = units === UNIT_SYSTEMS.METRIC;

  return {
    // State
    weatherData,
    location,
    isLoading,
    units,
    error,
    lastUpdated,
    unitLabels,
    hasData,
    isImperial,
    isMetric,

    // Actions
    handleLocationSelect,
    searchLocations,
    getCurrentLocation,
    toggleUnits,
    refreshWeatherData,
    clearError,
    reset,

    // Utils
    fetchWeatherData
  };
};


export const useLocationSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const search = useCallback(async (onLocationSelect) => {
    if (!searchTerm.trim()) {
      setSearchError('Please enter a search term');
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const results = await weatherService.searchLocations(searchTerm);
      
      if (results && results.length > 0) {
        const location = results[0]; 
        onLocationSelect(location);
        setSearchTerm(''); 
      } else {
        setSearchError('Location not found');
      }
    } catch (err) {
      console.error('Error searching location:', err);
      setSearchError(err.message || 'Error searching location');
    } finally {
      setIsSearching(false);
    }
  }, [searchTerm]);

  const getCurrentLocation = useCallback(async (onLocationSelect) => {
    setIsSearching(true);
    setSearchError(null);

    try {
      const location = await weatherService.getCurrentLocation();
      onLocationSelect(location);
    } catch (err) {
      console.error('Error getting current location:', err);
      setSearchError(err.message || 'Error getting current location');
    } finally {
      setIsSearching(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setSearchError(null);
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    isSearching,
    searchError,
    search,
    getCurrentLocation,
    clearSearch
  };
};