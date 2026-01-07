'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface AnimatedBackgroundProps {
    weatherCondition?: string;
    isDay?: boolean;
}

export default function AnimatedBackground({ weatherCondition = 'clear', isDay = true }: AnimatedBackgroundProps) {
    const { theme } = useTheme();
    const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number; duration: number }>>([]);

    useEffect(() => {
        // Generate particles for rain/snow effects
        const newParticles = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 1 + Math.random() * 2,
        }));
        setParticles(newParticles);
    }, [weatherCondition]);

    const getGradientClass = () => {
        const condition = weatherCondition?.toLowerCase() || 'clear';
        const isDark = theme === 'dark';

        if (condition.includes('rain') || condition.includes('drizzle')) {
            return isDark
                ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800'
                : 'bg-gradient-to-br from-slate-400 via-blue-400 to-slate-500';
        }
        if (condition.includes('snow')) {
            return isDark
                ? 'bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900'
                : 'bg-gradient-to-br from-slate-200 via-blue-100 to-white';
        }
        if (condition.includes('cloud')) {
            return isDark
                ? 'bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-900'
                : 'bg-gradient-to-br from-blue-300 via-blue-400 to-indigo-400';
        }
        if (condition.includes('thunder') || condition.includes('storm')) {
            return isDark
                ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-slate-900'
                : 'bg-gradient-to-br from-gray-500 via-purple-500 to-slate-600';
        }
        if (condition.includes('mist') || condition.includes('fog') || condition.includes('haze')) {
            return isDark
                ? 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900'
                : 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500';
        }
        // Clear/Sunny - default
        return isDark
            ? (isDay
                ? 'bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900'
                : 'bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900')
            : (isDay
                ? 'bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-500'
                : 'bg-gradient-to-br from-indigo-400 via-purple-400 to-slate-500');
    };

    const showRain = weatherCondition?.toLowerCase().includes('rain') || weatherCondition?.toLowerCase().includes('drizzle');
    const showSnow = weatherCondition?.toLowerCase().includes('snow');
    const showStars = theme === 'dark' && !isDay && !showRain && !showSnow;

    return (
        <div className={`fixed inset-0 ${getGradientClass()} transition-all duration-700 -z-10`}>
            {/* Animated gradient overlay */}
            <div className={`absolute inset-0 transition-opacity duration-700 ${theme === 'dark'
                    ? 'bg-gradient-to-t from-black/30 via-transparent to-transparent'
                    : 'bg-gradient-to-t from-white/20 via-transparent to-transparent'
                }`} />

            {/* Aurora effect for dark theme night */}
            {theme === 'dark' && !isDay && (
                <div className="absolute inset-0 overflow-hidden opacity-30">
                    <div className="absolute -top-1/2 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-aurora-1" />
                    <div className="absolute -top-1/2 right-1/4 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-aurora-2" />
                    <div className="absolute top-1/4 left-1/2 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl animate-aurora-3" />
                </div>
            )}

            {/* Sun rays for clear day in light theme */}
            {theme === 'light' && isDay && weatherCondition?.toLowerCase().includes('clear') && (
                <div className="absolute top-0 right-0 w-96 h-96 overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-300/40 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute top-10 right-10 w-32 h-32 bg-orange-300/50 rounded-full blur-2xl animate-float" />
                </div>
            )}

            {/* Sun glow for dark theme */}
            {theme === 'dark' && isDay && weatherCondition?.toLowerCase().includes('clear') && (
                <div className="absolute top-0 right-0 w-96 h-96 overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute top-10 right-10 w-32 h-32 bg-orange-300/30 rounded-full blur-2xl animate-float" />
                </div>
            )}

            {/* Rain particles */}
            {showRain && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {particles.map((particle) => (
                        <div
                            key={particle.id}
                            className={`absolute w-0.5 h-8 bg-gradient-to-b ${theme === 'dark' ? 'from-blue-400/60' : 'from-blue-600/60'
                                } to-transparent`}
                            style={{
                                left: `${particle.x}%`,
                                animation: `rain ${particle.duration}s linear infinite`,
                                animationDelay: `${particle.delay}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Snow particles */}
            {showSnow && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {particles.map((particle) => (
                        <div
                            key={particle.id}
                            className="absolute w-2 h-2 bg-white rounded-full opacity-80"
                            style={{
                                left: `${particle.x}%`,
                                animation: `snow ${particle.duration * 3}s linear infinite`,
                                animationDelay: `${particle.delay}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Stars for dark theme night */}
            {showStars && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {Array.from({ length: 30 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 50}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                opacity: 0.3 + Math.random() * 0.7,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Floating clouds */}
            {weatherCondition?.toLowerCase().includes('cloud') && (
                <div className={`absolute inset-0 overflow-hidden pointer-events-none ${theme === 'dark' ? 'opacity-20' : 'opacity-40'
                    }`}>
                    <div className="absolute top-20 left-10 w-40 h-20 bg-white rounded-full blur-2xl animate-cloud-1" />
                    <div className="absolute top-32 right-20 w-56 h-28 bg-white rounded-full blur-2xl animate-cloud-2" />
                    <div className="absolute top-10 left-1/2 w-48 h-24 bg-white rounded-full blur-2xl animate-cloud-3" />
                </div>
            )}
        </div>
    );
}
