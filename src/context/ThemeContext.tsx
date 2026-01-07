'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('skyguru-theme') as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        }
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('skyguru-theme', theme);
            document.documentElement.classList.toggle('dark', theme === 'dark');
        }
    }, [theme, mounted]);

    const toggleTheme = () => {
        // Check if browser supports View Transitions API
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                setTheme(prev => prev === 'light' ? 'dark' : 'light');
            });
        } else {
            // Fallback for browsers without View Transitions support
            setTheme(prev => prev === 'light' ? 'dark' : 'light');
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
