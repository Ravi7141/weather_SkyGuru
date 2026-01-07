'use client';

import { DailyForecast as DailyForecastType, TemperatureUnit } from '@/types/weather';
import { convertTemp, getWeatherIconUrl, formatDay } from '@/services/weather-service';
import Image from 'next/image';

interface DailyForecastProps {
    daily: DailyForecastType[];
    unit: TemperatureUnit;
}

export default function DailyForecast({ daily, unit }: DailyForecastProps) {
    const unitSymbol = unit === 'celsius' ? '°' : '°';

    return (
        <div className="glass-card rounded-3xl p-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                5-Day Forecast
            </h3>

            <div className="space-y-2">
                {daily.map((day, index) => (
                    <div
                        key={day.dt}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {/* Day */}
                        <div className="w-20">
                            <p className={`font-medium ${index === 0 ? 'text-blue-400' : 'text-white'}`}>
                                {formatDay(day.dt)}
                            </p>
                        </div>

                        {/* Weather Icon & Condition */}
                        <div className="flex items-center gap-3 flex-1">
                            <div className="relative w-10 h-10 group-hover:scale-110 transition-transform">
                                <Image
                                    src={getWeatherIconUrl(day.weather.icon)}
                                    alt={day.weather.description}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <p className="text-gray-400 text-sm capitalize hidden sm:block">
                                {day.weather.description}
                            </p>
                        </div>

                        {/* Precipitation */}
                        {day.pop > 0 && (
                            <div className="flex items-center gap-1 text-blue-400 text-sm mr-4">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4 4 0 117.88 0A4.5 4.5 0 0114.5 17h-9z" clipRule="evenodd" />
                                </svg>
                                {Math.round(day.pop * 100)}%
                            </div>
                        )}

                        {/* Temperature Range */}
                        <div className="flex items-center gap-2 w-24 justify-end">
                            <span className="text-white font-medium">
                                {convertTemp(day.temp.max, unit)}{unitSymbol}
                            </span>
                            <div className="w-16 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 opacity-50" />
                            <span className="text-gray-400">
                                {convertTemp(day.temp.min, unit)}{unitSymbol}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
