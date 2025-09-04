import { US_STATES } from './constants.js';


export const formatLocationName = (locationData) => {
  if (!locationData) return 'Unknown Location';
  
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
      // use state abbreviation for usa
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


export const isPostalCode = (str) => {
  if (!str) return false;
  return /^\d+$/.test(str) || 
         /^\d{5}(-\d{4})?$/.test(str) || 
         /^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(str);
};


export const getStateAbbreviation = (stateName) => {
  return US_STATES[stateName];
};


export const formatReverseGeocodedLocation = (data, latitude, longitude) => {
  let locationName = 'Current Location';
  
  if (data && data.address) {
    const city = data.address.city || 
                 data.address.town || 
                 data.address.village || 
                 data.address.hamlet;
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
  
  return {
    lat: latitude,
    lon: longitude,
    name: locationName
  };
};


export const validateCoordinates = (lat, lon) => {
  return (
    typeof lat === 'number' && 
    typeof lon === 'number' &&
    lat >= -90 && lat <= 90 &&
    lon >= -180 && lon <= 180
  );
};