'use client';

import { useTheme } from '@/context/ThemeContext';
import { useState, useEffect, useRef } from 'react';

export default function CelestialBody() {
    const { theme } = useTheme();
    const [animationKey, setAnimationKey] = useState(0);
    const [showLight, setShowLight] = useState(false);
    const isFirstRender = useRef(true);

    // Trigger rise animation and light spread when theme changes
    useEffect(() => {
        if (isFirstRender.current) {
            // First render - start with animation
            isFirstRender.current = false;
            setShowLight(false);
            const lightTimer = setTimeout(() => setShowLight(true), 1800);
            return () => clearTimeout(lightTimer);
        }

        // Theme changed - trigger new animation
        setAnimationKey(prev => prev + 1);
        setShowLight(false);

        // Show light spread after celestial body reaches position
        const lightTimer = setTimeout(() => setShowLight(true), 1800);
        return () => clearTimeout(lightTimer);
    }, [theme]);

    return (
        <>
            {/* Light spreading effect - appears after celestial body rises */}
            <div
                className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${showLight ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                {theme === 'light' ? (
                    /* Sunlight spreading across screen */
                    <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
                        <div
                            className="absolute -top-32 -right-32 w-[800px] h-[800px] rounded-full"
                            style={{
                                background: 'radial-gradient(circle at center, rgba(255,215,0,0.15) 0%, rgba(255,180,0,0.08) 30%, rgba(255,150,0,0.03) 50%, transparent 70%)',
                            }}
                        />
                    </div>
                ) : (
                    /* Moonlight spreading across screen */
                    <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
                        <div
                            className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full"
                            style={{
                                background: 'radial-gradient(circle at center, rgba(200,210,255,0.12) 0%, rgba(180,190,230,0.06) 35%, rgba(150,160,200,0.02) 55%, transparent 70%)',
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Celestial Body with rise animation */}
            <div
                key={animationKey}
                className="fixed right-8 md:right-16 pointer-events-none z-[1000] animate-celestial-rise"
            >
                {theme === 'light' ? (
                    /* Sun for Light Mode */
                    <div className="relative w-24 h-24 md:w-28 md:h-28">
                        {/* Outer soft glow layers */}
                        <div className="absolute -inset-16 rounded-full bg-yellow-300/15 blur-3xl animate-pulse" />
                        <div className="absolute -inset-12 rounded-full bg-orange-300/20 blur-2xl" />
                        <div className="absolute -inset-8 rounded-full bg-yellow-400/25 blur-xl animate-pulse" style={{ animationDuration: '2s' }} />
                        <div className="absolute -inset-4 rounded-full bg-yellow-300/35 blur-lg" />

                        {/* Inner glow ring */}
                        <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-yellow-200/50 via-orange-300/40 to-yellow-200/50 blur-md" />

                        {/* Main sun body */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-500 shadow-2xl shadow-yellow-500/70">
                            {/* Inner gradient for depth */}
                            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-300 to-orange-400" />
                            {/* Bright highlight */}
                            <div className="absolute top-2 left-2 w-6 h-6 md:w-7 md:h-7 rounded-full bg-white/60 blur-sm" />
                            <div className="absolute top-4 left-4 w-3 h-3 md:w-4 md:h-4 rounded-full bg-white/80 blur-[2px]" />
                        </div>

                        {/* Pulsing corona effect */}
                        <div className="absolute -inset-1 rounded-full border-4 border-yellow-300/30 animate-ping" style={{ animationDuration: '2s' }} />
                    </div>
                ) : (
                    /* Moon for Dark Mode */
                    <div className="relative w-24 h-24 md:w-28 md:h-28">
                        {/* Outer soft glow layers */}
                        <div className="absolute -inset-16 rounded-full bg-blue-200/10 blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
                        <div className="absolute -inset-12 rounded-full bg-indigo-200/15 blur-2xl" />
                        <div className="absolute -inset-8 rounded-full bg-blue-100/20 blur-xl animate-pulse" style={{ animationDuration: '2.5s' }} />
                        <div className="absolute -inset-4 rounded-full bg-slate-200/25 blur-lg" />

                        {/* Inner glow ring (moonlight halo) */}
                        <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-blue-100/40 via-slate-200/30 to-indigo-100/40 blur-md" />

                        {/* Main moon body */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-100 via-gray-200 to-slate-300 shadow-2xl shadow-blue-200/50 overflow-hidden">
                            {/* Craters */}
                            <div className="absolute top-3 left-4 w-5 h-5 md:w-6 md:h-6 rounded-full bg-slate-300/70" />
                            <div className="absolute top-6 right-3 w-3 h-3 md:w-4 md:h-4 rounded-full bg-slate-300/60" />
                            <div className="absolute bottom-4 left-5 w-6 h-6 md:w-7 md:h-7 rounded-full bg-slate-300/50" />
                            <div className="absolute bottom-7 right-5 w-2 h-2 md:w-3 md:h-3 rounded-full bg-slate-300/60" />
                            <div className="absolute top-10 left-2 w-2 h-2 md:w-3 md:h-3 rounded-full bg-slate-300/50" />

                            {/* Bright highlight */}
                            <div className="absolute top-1 left-1 w-6 h-6 md:w-7 md:h-7 rounded-full bg-white/50 blur-sm" />
                            <div className="absolute top-3 left-3 w-3 h-3 md:w-4 md:h-4 rounded-full bg-white/70 blur-[2px]" />
                        </div>

                        {/* Small stars around moon */}
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 rounded-full bg-white animate-twinkle"
                                style={{
                                    top: `${-40 + Math.random() * 180}%`,
                                    left: `${-40 + Math.random() * 180}%`,
                                    animationDelay: `${i * 0.3}s`,
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
