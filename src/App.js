import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import SingleMovie from './SingleMovie';
import { ThemeProvider } from './ThemeContext';
import ThemeToggle from './ThemeToggle';
import './App.css';

/**
 * Main App component that sets up routing and theme provider
 * @returns {JSX.Element} The main app structure
 */
function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movie/:id" element={<SingleMovie />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;