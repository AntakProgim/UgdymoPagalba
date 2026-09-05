import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  showLabel = false,
  className = '' 
}) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('vap_theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('vap_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('vap_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      id="theme-toggle-btn"
      aria-label={isDark ? "Perjungti į šviesų režimą" : "Perjungti į tamsų režimą"}
      title={isDark ? "Šviesus režimas (dienai)" : "Tamsus režimas (sumažina akių įtampą)"}
      className={`relative inline-flex items-center p-1.5 rounded-xl transition-all duration-300 group select-none ${
        isDark
          ? 'bg-slate-800 text-amber-300 border border-slate-700 hover:bg-slate-700/80 shadow-inner'
          : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200/80 hover:text-slate-900 shadow-sm'
      } ${className}`}
    >
      <div className="flex items-center space-x-2 px-1">
        {/* Animated Icon Container */}
        <div className={`p-1 rounded-lg transition-transform duration-300 ${
          isDark ? 'bg-amber-400/10 text-amber-300 rotate-0' : 'bg-slate-200/60 text-slate-700 -rotate-12'
        }`}>
          {isDark ? (
            <Moon size={16} className="transition-transform duration-300 group-hover:scale-110" />
          ) : (
            <Sun size={16} className="transition-transform duration-300 group-hover:rotate-45" />
          )}
        </div>

        {/* Optional Label */}
        {showLabel && (
          <span className={`text-[11px] font-bold uppercase tracking-wider pr-1 ${
            isDark ? 'text-slate-200' : 'text-slate-700'
          }`}>
            {isDark ? 'Tamsus' : 'Šviesus'}
          </span>
        )}

        {/* Visual micro toggle indicator */}
        <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-300 hidden sm:flex items-center ${
          isDark ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
        }`}>
          <div className="w-3 h-3 rounded-full bg-white shadow-sm transform transition-all duration-300" />
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
