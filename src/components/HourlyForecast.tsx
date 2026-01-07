'use client';

import { HourlyForecast as HourlyForecastType, TemperatureUnit } from '@/types/weather';
import { convertTemp, getWeatherIconUrl, formatTime } from '@/services/weather-service';
import Image from 'next/image';

interface HourlyForecastProps {
    hourly: HourlyForecastType[];
    unit: TemperatureUnit;
}

export default function HourlyForecast({ hourly, unit }: HourlyForecastProps) {
    const unitSymbol = unit === 'celsius' ? '°' : '°';

    return (
        <div className="glass-card rounded-3xl p-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Hourly Forecast
            </h3>

            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {hourly.map((hour, index) => (
                    <div
                        key={hour.dt}
                        className={`flex-shrink-0 flex flex-col items-center p-4 rounded-2xl transition-all duration-300 hover:bg-white/10 ${index === 0 ? 'bg-gradient-to-b from-blue-500/20 to-transparent' : ''
                            }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <p className="text-gray-400 text-sm mb-2">
                            {index === 0 ? 'Now' : formatTime(hour.dt)}
                        </p>
                        <div className="relative w-12 h-12 my-1">
                            <Image
                                src={getWeatherIconUrl(hour.weather.icon)}
                                alt={hour.weather.description}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <p className="text-white font-semibold text-lg">
                            {convertTemp(hour.temp, unit)}{unitSymbol}
                        </p>
                        {hour.pop > 0 && (
                            <p className="text-blue-400 text-xs mt-1 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4 4 0 117.88 0A4.5 4.5 0 0114.5 17h-9z" clipRule="evenodd" />
                                </svg>
                                {Math.round(hour.pop * 100)}%
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
