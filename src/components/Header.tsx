'use client';

import { useTheme } from '@/context/ThemeContext';
import { TemperatureUnit } from '@/types/weather';

interface HeaderProps {
    unit: TemperatureUnit;
    onUnitChange: (unit: TemperatureUnit) => void;
}

export default function Header({ unit, onUnitChange }: HeaderProps) {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="w-full py-4 px-6 flex items-center justify-between relative z-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <defs>
                            <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FFD700" />
                                <stop offset="100%" stopColor="#FFA500" />
                            </linearGradient>
                        </defs>
                        <circle cx="50" cy="50" r="25" fill="url(#sunGradient)" className="animate-pulse" />
                        <g stroke="url(#sunGradient)" strokeWidth="3" strokeLinecap="round">
                            <line x1="50" y1="10" x2="50" y2="20" className="origin-center animate-spin-slow" />
                            <line x1="50" y1="80" x2="50" y2="90" className="origin-center animate-spin-slow" />
                            <line x1="10" y1="50" x2="20" y2="50" className="origin-center animate-spin-slow" />
                            <line x1="80" y1="50" x2="90" y2="50" className="origin-center animate-spin-slow" />
                            <line x1="22" y1="22" x2="29" y2="29" className="origin-center animate-spin-slow" />
                            <line x1="71" y1="71" x2="78" y2="78" className="origin-center animate-spin-slow" />
                            <line x1="22" y1="78" x2="29" y2="71" className="origin-center animate-spin-slow" />
                            <line x1="71" y1="29" x2="78" y2="22" className="origin-center animate-spin-slow" />
                        </g>
                    </svg>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                    SkyGuru
                </h1>
            </div>

            {/* Controls - moved left to avoid sun/moon overlap */}
            <div className="flex items-center gap-3 mr-32 md:mr-40">
                {/* Unit Toggle */}
                <div className={`px-1 py-1 rounded-full flex transition-all duration-300 ${theme === 'dark'
                        ? 'bg-white/10 border border-white/20'
                        : 'bg-white/60 border border-slate-300 shadow-sm'
                    }`}>
                    <button
                        onClick={() => onUnitChange('celsius')}
                        className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${unit === 'celsius'
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                                : theme === 'dark'
                                    ? 'text-gray-300 hover:text-white'
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                    >
                        °C
                    </button>
                    <button
                        onClick={() => onUnitChange('fahrenheit')}
                        className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${unit === 'fahrenheit'
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                                : theme === 'dark'
                                    ? 'text-gray-300 hover:text-white'
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                    >
                        °F
                    </button>
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className={`p-2.5 rounded-full hover:scale-110 transition-all duration-300 ${theme === 'dark'
                            ? 'bg-white/10 border border-white/20 hover:bg-white/20'
                            : 'bg-white/60 border border-slate-300 hover:bg-white shadow-sm'
                        }`}
                    aria-label="Toggle theme"
                >
                    {theme === 'dark' ? (
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                    )}
                </button>
            </div>
        </header>
    );
}
