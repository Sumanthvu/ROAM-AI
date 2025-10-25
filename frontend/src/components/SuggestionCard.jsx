// src/components/SuggestionCard.jsx

import React, { useState } from 'react';
import './SuggestionCard.css';

const SuggestionCard = ({ suggestion, onSelect }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {
    place,
    reason,
    weather_suitability,
    travel_cost_estimate,
    accommodation_range,
    safety_rating,
    photos,
  } = suggestion;

  const hasPhotos = photos && photos.length > 0;

  const handleNextImage = (e) => {
    e.stopPropagation(); // Prevent the card's onSelect from firing
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  const handleSelect = () => {
    onSelect(suggestion);
  };

  return (
    <div className="suggestion-card">
      <div className="card-image-container">
        {hasPhotos ? (
          <>
            <img src={photos[currentImageIndex]} alt={`${place} - ${currentImageIndex + 1}`} className="card-image" />
            {photos.length > 1 && (
              <>
                <button onClick={handlePrevImage} className="carousel-button prev">‹</button>
                <button onClick={handleNextImage} className="carousel-button next">›</button>
                <div className="image-counter">{currentImageIndex + 1} / {photos.length}</div>
              </>
            )}
          </>
        ) : (
          <div className="placeholder-image">
            <span>No Image Available</span>
          </div>
        )}
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