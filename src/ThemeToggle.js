import React from 'react';
import { useTheme } from './ThemeContext';
import './ThemeToggle.css';

/**
 * ThemeToggle component for switching between light and dark themes
 * @returns {JSX.Element} Theme toggle button
 */
const ThemeToggle = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {isDarkTheme ? '🌞' : '🌙'}
    </button>
  );
};

export default ThemeToggle; 