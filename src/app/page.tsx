'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import CurrentWeather from '@/components/CurrentWeather';
import HourlyForecast from '@/components/HourlyForecast';
import DailyForecast from '@/components/DailyForecast';
import WeatherDetails from '@/components/WeatherDetails';
import AnimatedBackground from '@/components/AnimatedBackground';
import CelestialBody from '@/components/CelestialBody';
import LoadingSpinner from '@/components/LoadingSpinner';
import { WeatherData, TemperatureUnit, GeoLocation } from '@/types/weather';
import { getWeatherByCoords } from '@/services/weather-service';
import { useTheme } from '@/context/ThemeContext';

export default function Home() {
  const { theme } = useTheme();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Check if it's daytime based on sunrise/sunset
  const isDay = weather
    ? weather.current.dt > weather.current.sunrise && weather.current.dt < weather.current.sunset
    : true;

  const fetchWeather = async (lat: number, lon: number) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const data = await getWeatherByCoords(lat, lon);
      if (data) {
        setWeather(data);
      } else {
        setError('Failed to fetch weather data. Please check your API key.');
      }
    } catch (err) {
      setError('An error occurred while fetching weather data.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = (location: GeoLocation) => {
    fetchWeather(location.lat, location.lon);
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        setError('Unable to get your location. Please search for a city instead.');
        setIsLoading(false);
        console.error(err);
      }
    );
  };

  // Load saved unit preference
  useEffect(() => {
    const savedUnit = localStorage.getItem('skyguru-unit') as TemperatureUnit;
    if (savedUnit) {
      setUnit(savedUnit);
    }
  }, []);

  // Save unit preference
  const handleUnitChange = (newUnit: TemperatureUnit) => {
    setUnit(newUnit);
    localStorage.setItem('skyguru-unit', newUnit);
  };

  return (
    <main className="relative min-h-screen">
      {/* Animated Background */}
      <AnimatedBackground
        weatherCondition={weather?.current.weather.main}
        isDay={isDay}
      />

      {/* Sun/Moon Celestial Body */}
      <CelestialBody />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <Header unit={unit} onUnitChange={handleUnitChange} />

        {/* Main Content */}
        <div className="flex-1 container mx-auto px-4 py-6 max-w-6xl">
          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar
              onLocationSelect={handleLocationSelect}
              onGeolocation={handleGeolocation}
              isLoading={isLoading}
            />
          </div>

          {/* Loading State */}
          {isLoading && <LoadingSpinner />}

          {/* Error State */}
          {error && !isLoading && (
            <div className={`rounded-2xl p-6 text-center animate-fade-in ${theme === 'dark'
              ? 'bg-white/10 border border-white/20'
              : 'bg-white/70 border border-slate-300'
              }`}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="text-red-400 text-lg">{error}</p>
              <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                Please try again or search for a different city.
              </p>
            </div>
          )}

          {/* Welcome State */}
          {!hasSearched && !isLoading && (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <div className={`absolute inset-0 rounded-full animate-pulse ${theme === 'dark'
                  ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20'
                  : 'bg-gradient-to-br from-blue-400/30 to-purple-400/30'
                  }`} />
                <svg className={`w-full h-full ${theme === 'dark' ? 'text-white/30' : 'text-slate-400'}`} viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="25" fill="currentColor" className="animate-pulse" />
                  <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-50">
                    <line x1="50" y1="10" x2="50" y2="20" />
                    <line x1="50" y1="80" x2="50" y2="90" />
                    <line x1="10" y1="50" x2="20" y2="50" />
                    <line x1="80" y1="50" x2="90" y2="50" />
                  </g>
                </svg>
              </div>
              <h2 className={`text-3xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                Welcome to SkyGuru
              </h2>
              <p className={`text-lg max-w-md mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                Search for a city or use your location to get started with real-time weather updates.
              </p>
              <button
                onClick={handleGeolocation}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-medium hover:scale-105 transition-transform duration-300 flex items-center gap-2 mx-auto shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Use My Location
              </button>
            </div>
          )}

          {/* Weather Data */}
          {weather && !isLoading && (
            <div className="space-y-6 animate-fade-in">
              {/* Current Weather */}
              <CurrentWeather data={weather} unit={unit} />

              {/* Hourly & Daily Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <HourlyForecast hourly={weather.hourly} unit={unit} />
                <DailyForecast daily={weather.daily} unit={unit} />
              </div>

              {/* Weather Details */}
              <WeatherDetails data={weather} />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className={`py-6 text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
          <p>
            Powered by{' '}
            <a
              href="https://openweathermap.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              OpenWeatherMap
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
