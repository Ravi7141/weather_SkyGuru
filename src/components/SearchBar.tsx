'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { GeoLocation } from '@/types/weather';
import { searchLocations } from '@/services/weather-service';
import { useTheme } from '@/context/ThemeContext';

interface SearchBarProps {
    onLocationSelect: (location: GeoLocation) => void;
    onGeolocation: () => void;
    isLoading: boolean;
}

export default function SearchBar({ onLocationSelect, onGeolocation, isLoading }: SearchBarProps) {
    const { theme } = useTheme();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<GeoLocation[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const debouncedSearch = useCallback(async (searchQuery: string) => {
        if (searchQuery.length < 2) {
            setSuggestions([]);
            return;
        }

        setIsSearching(true);
        const results = await searchLocations(searchQuery);
        setSuggestions(results);
        setIsSearching(false);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            debouncedSearch(query);
        }, 300);

        return () => clearTimeout(timer);
    }, [query, debouncedSearch]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (location: GeoLocation) => {
        setQuery(`${location.name}, ${location.country}`);
        setShowSuggestions(false);
        setSuggestions([]);
        onLocationSelect(location);
    };

    return (
        <div ref={searchRef} className="relative w-full max-w-xl mx-auto">
            <div className="relative flex items-center">
                {/* Search Input */}
                <div className="relative flex-1">
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
                        }`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="Search for a city..."
                        className={`w-full pl-12 pr-4 py-4 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${theme === 'dark'
                                ? 'bg-white/10 border border-white/20 text-white placeholder-gray-400'
                                : 'bg-white/70 border border-slate-300 text-slate-800 placeholder-slate-500'
                            }`}
                    />
                    {(isSearching || isLoading) && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}
                </div>

                {/* Geolocation Button */}
                <button
                    onClick={onGeolocation}
                    disabled={isLoading}
                    className={`ml-3 p-4 rounded-2xl hover:scale-105 transition-all duration-300 group disabled:opacity-50 ${theme === 'dark'
                            ? 'bg-white/10 border border-white/20 hover:bg-white/20'
                            : 'bg-white/70 border border-slate-300 hover:bg-white'
                        }`}
                    title="Use my location"
                >
                    <svg
                        className={`w-5 h-5 transition-colors ${theme === 'dark'
                                ? 'text-gray-400 group-hover:text-blue-400'
                                : 'text-slate-500 group-hover:text-blue-600'
                            }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                </button>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <div className={`absolute w-full mt-2 rounded-2xl overflow-hidden z-50 animate-fade-in ${theme === 'dark'
                        ? 'bg-slate-900/95 border border-white/20'
                        : 'bg-white/95 border border-slate-300'
                    }`} style={{ backdropFilter: 'blur(16px)' }}>
                    {suggestions.map((location, index) => (
                        <button
                            key={`${location.lat}-${location.lon}-${index}`}
                            onClick={() => handleSelect(location)}
                            className={`w-full px-4 py-3 text-left transition-colors flex items-center gap-3 border-b last:border-0 ${theme === 'dark'
                                    ? 'hover:bg-white/10 border-white/5'
                                    : 'hover:bg-slate-100 border-slate-200'
                                }`}
                        >
                            <svg className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                            </svg>
                            <div>
                                <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{location.name}</p>
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                                    {location.state ? `${location.state}, ` : ''}{location.country}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
