import React from 'react';
import './SavedTripPinCard.css';

const SavedTripPinCard = ({ trip, onDelete }) => {
  const { tripPlan } = trip;
  const { selected_place, preferences } = tripPlan;

  const getBackgroundImage = () => {
    if (tripPlan.suggestions && tripPlan.suggestions.length > 0 && tripPlan.suggestions[0].photos && tripPlan.suggestions[0].photos.length > 0) {
      return tripPlan.suggestions[0].photos[0];
    }
    // A default fallback image
    return 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0';
  };

  return (
    <div className="pin-card-container">
       <button 
          onClick={(e) => {
            // Stop click from propagating to the parent link/div
            e.stopPropagation(); 
            e.preventDefault();
            onDelete(trip._id);
          }} 
          className="pin-card-delete-button"
        >
          ×
        </button>
      <div 
        className="pin-card-image" 
        style={{ backgroundImage: `url(${getBackgroundImage()})` }}
      >
      </div>
      <div className="pin-card-content">
        <h3 className="pin-card-title">{selected_place}</h3>
        <div className="pin-card-details">
          <div className="pin-card-detail-item">
            <span className="detail-label">DURATION</span>
            <span className="detail-value">{preferences.duration} Days</span>
          </div>
          <div className="pin-card-detail-item">
            <span className="detail-label">GROUP</span>
            <span className="detail-value">{preferences.no_of_people} ({preferences.group_type})</span>
          </div>
          <div className="pin-card-detail-item">
            <span className="detail-label">STYLE</span>
            <span className="detail-value">{preferences.travel_type}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedTripPinCard;