'use client';

import { WeatherData } from '@/types/weather';
import { getWindDirection, formatTime } from '@/services/weather-service';

interface WeatherDetailsProps {
    data: WeatherData;
}

export default function WeatherDetails({ data }: WeatherDetailsProps) {
    const details = [
        {
            label: 'Humidity',
            value: `${data.current.humidity}%`,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            ),
            color: 'from-cyan-400 to-blue-500',
            bgColor: 'bg-cyan-500/20',
            progress: data.current.humidity,
        },
        {
            label: 'Wind Speed',
            value: `${data.current.wind_speed} m/s`,
            subValue: getWindDirection(data.current.wind_deg),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            ),
            color: 'from-emerald-400 to-teal-500',
            bgColor: 'bg-emerald-500/20',
        },
        {
            label: 'Pressure',
            value: `${data.current.pressure} hPa`,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            color: 'from-violet-400 to-purple-500',
            bgColor: 'bg-violet-500/20',
        },
        {
            label: 'Visibility',
            value: `${data.current.visibility} km`,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            ),
            color: 'from-amber-400 to-orange-500',
            bgColor: 'bg-amber-500/20',
        },
        {
            label: 'Sunrise',
            value: formatTime(data.current.sunrise),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            color: 'from-yellow-400 to-amber-500',
            bgColor: 'bg-yellow-500/20',
        },
        {
            label: 'Sunset',
            value: formatTime(data.current.sunset),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            ),
            color: 'from-orange-400 to-rose-500',
            bgColor: 'bg-orange-500/20',
        },
    ];

    return (
        <div className="glass-card rounded-3xl p-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Weather Details
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {details.map((detail, index) => (
                    <div
                        key={detail.label}
                        className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2 rounded-xl ${detail.bgColor} text-white group-hover:scale-110 transition-transform`}>
                                {detail.icon}
                            </div>
                            <p className="text-gray-400 text-sm">{detail.label}</p>
                        </div>
                        <p className={`text-2xl font-bold bg-gradient-to-r ${detail.color} bg-clip-text text-transparent`}>
                            {detail.value}
                        </p>
                        {detail.subValue && (
                            <p className="text-gray-400 text-sm mt-1">{detail.subValue}</p>
                        )}
                        {detail.progress !== undefined && (
                            <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full bg-gradient-to-r ${detail.color} transition-all duration-500`}
                                    style={{ width: `${detail.progress}%` }}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
