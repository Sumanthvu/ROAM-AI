// src/components/LoadingSpinner.jsx

import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container"></div>
    </div>
  );
};

export default LoadingSpinner;