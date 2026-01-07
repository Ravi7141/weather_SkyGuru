'use client';

import { WeatherData, TemperatureUnit } from '@/types/weather';
import { convertTemp, getWeatherIconUrl, formatDate } from '@/services/weather-service';
import Image from 'next/image';

interface CurrentWeatherProps {
    data: WeatherData;
    unit: TemperatureUnit;
}

export default function CurrentWeather({ data, unit }: CurrentWeatherProps) {
    const temp = convertTemp(data.current.temp, unit);
    const feelsLike = convertTemp(data.current.feels_like, unit);
    const unitSymbol = unit === 'celsius' ? '°C' : '°F';

    return (
        <div className="glass-card rounded-3xl p-8 animate-fade-in">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Left - Location & Date */}
                <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                        </svg>
                        <h2 className="text-xl font-semibold text-white">
                            {data.location.name}, {data.location.country}
                        </h2>
                    </div>
                    <p className="text-gray-400">{formatDate(data.current.dt)}</p>
                </div>

                {/* Center - Temperature */}
                <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 md:w-32 md:h-32">
                        <Image
                            src={getWeatherIconUrl(data.current.weather.icon)}
                            alt={data.current.weather.description}
                            fill
                            className="object-contain drop-shadow-2xl animate-float"
                        />
                    </div>
                    <div className="text-center">
                        <div className="text-6xl md:text-8xl font-bold text-white tracking-tighter">
                            {temp}<span className="text-4xl md:text-5xl text-gray-400">{unitSymbol}</span>
                        </div>
                        <p className="text-lg capitalize text-gray-300 mt-1">
                            {data.current.weather.description}
                        </p>
                    </div>
                </div>

                {/* Right - Feels Like */}
                <div className="text-center md:text-right">
                    <p className="text-gray-400 mb-1">Feels like</p>
                    <p className="text-3xl font-semibold text-white">
                        {feelsLike}{unitSymbol}
                    </p>
                </div>
            </div>

            {/* Weather Stats Bar */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Clouds</p>
                        <p className="text-white font-medium">{data.current.clouds}%</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Humidity</p>
                        <p className="text-white font-medium">{data.current.humidity}%</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Wind</p>
                        <p className="text-white font-medium">{data.current.wind_speed} m/s</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Visibility</p>
                        <p className="text-white font-medium">{data.current.visibility} km</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
