// src/components/LocalInfoSelector.jsx

import React from 'react';
import './LocalInfoSelector.css';

const LocalInfoSelector = ({
  place,
  localInfo,
  selectedAttractions,
  setSelectedAttractions,
  selectedCuisines,
  setSelectedCuisines,
}) => {
  const handleAttractionChange = (attractionName) => {
    setSelectedAttractions((prev) =>
      prev.includes(attractionName)
        ? prev.filter((item) => item !== attractionName)
        : [...prev, attractionName]
    );
  };

  const handleCuisineChange = (cuisineName) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisineName)
        ? prev.filter((item) => item !== cuisineName)
        : [...prev, cuisineName]
    );
  };

  return (
    <div className="selector-container">
      <h2 className="selector-title">Customize Your Trip to {place}</h2>
      <p className="selector-subtitle">Select the attractions and cuisines you're most interested in.</p>

      <div className="selection-columns">
        <div className="selection-column">
          <h3 className="column-title">Top Attractions</h3>
          <div className="items-list">
            {localInfo.top_attractions.map((attraction, index) => (
              <div key={index} className="item-card">
                <input
                  type="checkbox"
                  id={`attraction-${index}`}
                  checked={selectedAttractions.includes(attraction.name)}
                  onChange={() => handleAttractionChange(attraction.name)}
                />
                <label htmlFor={`attraction-${index}`}>
                  <span className="item-name">{attraction.name}</span>
                  <span className="item-description">{attraction.description}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="selection-column">
          <h3 className="column-title">Local Cuisine to Try</h3>
          <div className="items-list">
            {localInfo.local_cuisine.map((cuisine, index) => (
              <div key={index} className="item-card">
                <input
                  type="checkbox"
                  id={`cuisine-${index}`}
                  checked={selectedCuisines.includes(cuisine.dish)}
                  onChange={() => handleCuisineChange(cuisine.dish)}
                />
                <label htmlFor={`cuisine-${index}`}>
                  <span className="item-name">{cuisine.dish}</span>
                  <span className="item-description">{cuisine.description}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalInfoSelector;