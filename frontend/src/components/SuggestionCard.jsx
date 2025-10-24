// src/components/SuggestionCard.jsx

import React from 'react';
import './SuggestionCard.css';

const SuggestionCard = ({ suggestion, onSelect }) => {
  const {
    place,
    reason,
    weather_suitability,
    travel_cost_estimate,
    accommodation_range,
    safety_rating,
    photos,
  } = suggestion;

  const handleSelect = () => {
    onSelect(suggestion);
  };

  return (
    <div className="suggestion-card">
      <div className="card-image-container">
        <img src={photos[0]} alt={place} className="card-image" />
      </div>
      <div className="card-content">
        <h3 className="card-title">{place}</h3>
        <p className="card-reason">{reason}</p>
        <div className="card-details">
          <p><strong>Best Time:</strong> {weather_suitability}</p>
          <p><strong>Est. Travel Cost:</strong> {travel_cost_estimate?.flight || travel_cost_estimate?.bus || 'N/A'}</p>
          <p><strong>Accommodation:</strong> {accommodation_range}</p>
          <p><strong>Safety:</strong> <span className={`safety-rating ${safety_rating?.toLowerCase()}`}>{safety_rating}</span></p>
        </div>
        <button onClick={handleSelect} className="select-place-button">
          Select this Destination
        </button>
      </div>
    </div>
  );
};

export default SuggestionCard;