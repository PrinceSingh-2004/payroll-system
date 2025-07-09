import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import './GlassBackground.css';

const GlassBackground = () => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div className={`glass-bg-root ${darkMode ? 'dark' : 'light'}`}>
      {/* Coin-like blurred circles */}
      <div className="coin coin-1" />
      <div className="coin coin-2" />
      <div className="coin coin-3" />
      <div className="coin coin-4" />
      <div className="coin coin-5" />
    </div>
  );
};

export default GlassBackground; 