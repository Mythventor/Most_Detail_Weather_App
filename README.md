# Most Detailed Weather App

Getting tired of the crazy amount of ads from [The Weather Channel](https://weather.com/)? Getting tired of searching for a weather app that shows every detail of the forecast? 

This tool provides the most detailed weather information, based on your current geographical location or search. ALL without any ads!

## Features

- **Ad-Free Experience** - No advertisements, just pure weather data
- **Current Weather** - Real-time conditions with temperature, humidity, pressure, wind speed, and more
- **7-Day Forecast** - Complete weekly outlook with sunrise/sunset times
- **Advanced Meteorological Data** - Detailed metrics including UV index, solar radiation, precipitation probability, and atmospheric pressure
- **Location Search** - Search by city, state, or postal code
- **GPS Location** - Automatic detection of your current location
- **Dark/Light Mode** - Toggle between themes for comfortable viewing
- **Unit System Toggle** - Switch between Metric (°C, km/h, mm) and Imperial (°F, mph, inches)


## Project Demo
[Project Video Link](https://northwestern.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=05006c52-4ecf-4d83-97a5-b342002dd07c)

## Prerequisites

- **Node.js** (version 18 or higher)
- **pnpm** package manager
- Modern web browser with JavaScript enabled
- Internet connection for API calls

## Setup

### macOS

1. **Install Homebrew** (if not already installed):
   ```
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install Node.js**:
   ```
   brew install node
   ```

3. **Install pnpm**:
   ```
   brew install pnpm
   ```

4. **Clone the repository**:
   ```
   git clone <your-repository-url>
   cd most-detailed-weather-app
   ```

5. **Install dependencies**:
   ```
   pnpm install
   ```

6. **Start the development server**:
   ```
   pnpm dev
   ```

7. **Open your browser** and navigate to `http://localhost:5173`

### Windows

1. **Install Node.js**:
   - Download from [nodejs.org](https://nodejs.org/)
   - Choose the LTS version (includes npm)
   - Run the installer and follow the setup wizard

2. **Install pnpm**:
   ```cmd
   npm install -g pnpm
   ```

3. **Clone the repository**:
   ```cmd
   git clone <your-repository-url>
   cd most-detailed-weather-app
   ```

4. **Install dependencies**:
   ```cmd
   pnpm install
   ```

5. **Start the development server**:
   ```cmd
   pnpm dev
   ```

6. **Open your browser** and navigate to `http://localhost:5173`

## 🔧 Build for Production

To create a production build:

```bash
pnpm build
```

To preview the production build locally:

```bash
pnpm preview
```

## APIs Used

This application integrates two powerful APIs to deliver comprehensive weather information:

### 1. Open-Meteo Weather API
- **Purpose**: Primary weather data source
- **Endpoint**: `https://api.open-meteo.com/v1/forecast`
- **Cost**: Completely FREE - No API key required
- **Data Provided**:
  - Current weather conditions (temperature, humidity, pressure, wind)
  - 7-day daily forecasts (high/low temps, weather codes, sunrise/sunset)
  - Hourly forecasts and detailed meteorological data
  - Solar radiation, UV index, precipitation data
  - Supports both metric and imperial units

### 2. Geocode Maps API (geocode.maps.co)
- **Purpose**: Location search and reverse geocoding
- **Endpoint**: `https://geocode.maps.co/search` and `https://geocode.maps.co/reverse`
- **API Key**: Included in the application (free tier)
- **Data Provided**:
  - Forward geocoding (city name → coordinates)
  - Reverse geocoding (coordinates → location name)
  - Address formatting and parsing
  - Support for various location formats (city, state, postal code)

## Usage

1. **Default View**: Opens with Chicago weather data
2. **Search Location**: Enter any city, state, or postal code in the search box
3. **GPS Location**: Click the GPS button to use your current location
4. **Switch Units**: Toggle between Metric and Imperial units
5. **Advanced Data**: Click "Show Advanced Data" to see detailed meteorological information
6. **Dark Mode**: Use the theme toggle in the header for comfortable viewing

## Technologies Used

- **React 19** 
- **Vite** 
- **Tailwind CSS 4** 
- **Lucide React** 
- **pnpm**

## Contributor

- **Mengpang Xing**

---

**Enjoy ad-free, detailed weather information! 🌤️**