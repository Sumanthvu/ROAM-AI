// src/components/SavedTripPinCard.jsx

import React from 'react';
import './SavedTripPinCard.css';

const SavedTripPinCard = ({ trip, onDelete }) => {
  const { tripPlan } = trip;
  const { selected_place, preferences } = tripPlan;

  // Function to get a background image, with a fallback
  const getBackgroundImage = () => {
    if (tripPlan.suggestions?.[0]?.photos?.[0]) {
      return tripPlan.suggestions[0].photos[0];
    }
    return 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0'; // Default fallback
  };

  // Stop propagation on the delete button to prevent triggering navigation
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onDelete(trip._id);
  };

  return (
    <div className="trip-card">
       <button 
        onClick={handleDeleteClick} 
        className="card-delete-button"
        aria-label="Delete Trip"
      >
        &times;
      </button>

      <div 
        className="card-image"
        style={{ backgroundImage: `url(${getBackgroundImage()})` }}
      >
        {/* The overlay is now part of the image div for better blending */}
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{selected_place}</h3>
        
        <div className="card-details">
          <div className="detail-item">
            <span>Duration</span>
            <span>{preferences.duration} Days</span>
          </div>
          <div className="detail-item">
            <span>Group</span>
            <span>{preferences.group_type}</span>
          </div>
           <div className="detail-item">
            <span>Style</span>
            <span>{preferences.travel_type}</span>
          </div>
        </div>

        <div className="card-footer">
          <span className="view-itinerary-link">
            View Itinerary &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};

export default SavedTripPinCard;