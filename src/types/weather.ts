// Weather API response types

export interface WeatherData {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    wind_speed: number;
    wind_deg: number;
    visibility: number;
    uvi: number;
    clouds: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    };
    sunrise: number;
    sunset: number;
    dt: number;
  };
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}

export interface HourlyForecast {
  dt: number;
  temp: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  pop: number; // Probability of precipitation
}

export interface DailyForecast {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  pop: number;
  humidity: number;
  wind_speed: number;
}

export interface GeoLocation {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface WeatherCondition {
  type: 'clear' | 'clouds' | 'rain' | 'snow' | 'thunderstorm' | 'mist' | 'default';
  isDay: boolean;
}
