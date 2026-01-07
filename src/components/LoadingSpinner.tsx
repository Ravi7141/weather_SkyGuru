'use client';

export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
            {/* Weather themed loading animation */}
            <div className="relative w-24 h-24">
                {/* Sun */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 animate-pulse shadow-lg shadow-orange-500/30" />
                </div>

                {/* Orbiting cloud */}
                <div className="absolute inset-0 animate-spin-slow">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-5 bg-white rounded-full blur-[2px] opacity-80" />
                </div>

                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-4 border-white/20 border-t-blue-400 animate-spin" />
            </div>

            {/* Loading text */}
            <div className="text-center">
                <p className="text-white/80 text-lg font-medium">Loading weather data</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
            </div>
        </div>
    );
}
