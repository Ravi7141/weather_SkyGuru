import { WeatherData, GeoLocation, HourlyForecast, DailyForecast } from '@/types/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org';

export async function searchLocations(query: string): Promise<GeoLocation[]> {
    if (!query.trim()) return [];

    try {
        const response = await fetch(
            `${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
        );

        if (!response.ok) throw new Error('Failed to fetch locations');

        const data = await response.json();
        return data.map((item: any) => ({
            name: item.name,
            lat: item.lat,
            lon: item.lon,
            country: item.country,
            state: item.state,
        }));
    } catch (error) {
        console.error('Error searching locations:', error);
        return [];
    }
}

export async function getWeatherByCoords(lat: number, lon: number): Promise<WeatherData | null> {
    try {
        // First, get location name using reverse geocoding
        const geoResponse = await fetch(
            `${BASE_URL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoResponse.json();
        const locationName = geoData[0]?.name || 'Unknown';
        const country = geoData[0]?.country || '';

        // Get current weather
        const currentResponse = await fetch(
            `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const currentData = await currentResponse.json();

        // Get forecast (hourly and daily)
        const forecastResponse = await fetch(
            `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const forecastData = await forecastResponse.json();

        // Process hourly forecast (next 24 hours, every 3 hours from 5-day forecast)
        const hourly: HourlyForecast[] = forecastData.list.slice(0, 8).map((item: any) => ({
            dt: item.dt,
            temp: Math.round(item.main.temp),
            weather: {
                id: item.weather[0].id,
                main: item.weather[0].main,
                description: item.weather[0].description,
                icon: item.weather[0].icon,
            },
            pop: item.pop || 0,
        }));

        // Process daily forecast (group by day)
        const dailyMap = new Map<string, any[]>();
        forecastData.list.forEach((item: any) => {
            const date = new Date(item.dt * 1000).toDateString();
            if (!dailyMap.has(date)) {
                dailyMap.set(date, []);
            }
            dailyMap.get(date)?.push(item);
        });

        const daily: DailyForecast[] = Array.from(dailyMap.entries()).slice(0, 5).map(([_, items]) => {
            const temps = items.map((i: any) => i.main.temp);
            const midItem = items[Math.floor(items.length / 2)];
            return {
                dt: midItem.dt,
                temp: {
                    min: Math.round(Math.min(...temps)),
                    max: Math.round(Math.max(...temps)),
                },
                weather: {
                    id: midItem.weather[0].id,
                    main: midItem.weather[0].main,
                    description: midItem.weather[0].description,
                    icon: midItem.weather[0].icon,
                },
                pop: Math.max(...items.map((i: any) => i.pop || 0)),
                humidity: midItem.main.humidity,
                wind_speed: midItem.wind.speed,
            };
        });

        return {
            location: {
                name: locationName,
                country: country,
                lat: lat,
                lon: lon,
            },
            current: {
                temp: Math.round(currentData.main.temp),
                feels_like: Math.round(currentData.main.feels_like),
                humidity: currentData.main.humidity,
                pressure: currentData.main.pressure,
                wind_speed: currentData.wind.speed,
                wind_deg: currentData.wind.deg || 0,
                visibility: currentData.visibility / 1000, // Convert to km
                uvi: 0, // Not available in free API
                clouds: currentData.clouds.all,
                weather: {
                    id: currentData.weather[0].id,
                    main: currentData.weather[0].main,
                    description: currentData.weather[0].description,
                    icon: currentData.weather[0].icon,
                },
                sunrise: currentData.sys.sunrise,
                sunset: currentData.sys.sunset,
                dt: currentData.dt,
            },
            hourly,
            daily,
        };
    } catch (error) {
        console.error('Error fetching weather:', error);
        return null;
    }
}

export function getWeatherIconUrl(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

export function convertTemp(temp: number, unit: 'celsius' | 'fahrenheit'): number {
    if (unit === 'fahrenheit') {
        return Math.round((temp * 9 / 5) + 32);
    }
    return temp;
}

export function getWindDirection(degrees: number): string {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
}

export function formatTime(timestamp: number, timezone?: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

export function formatDay(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

    return date.toLocaleDateString('en-US', { weekday: 'short' });
}

export function formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });
}
