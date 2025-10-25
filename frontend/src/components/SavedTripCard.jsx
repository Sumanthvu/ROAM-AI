// src/components/SavedTripCard.jsx

import React, { useState } from 'react';
import ItineraryDisplay from './ItineraryDisplay'; 
import './SavedTripCard.css';

const SavedTripCard = ({ trip, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { tripPlan } = trip;
  const { selected_place, preferences, itinerary } = tripPlan;

  const getBackgroundImage = () => {
    if (tripPlan.suggestions && tripPlan.suggestions.length > 0 && tripPlan.suggestions[0].photos && tripPlan.suggestions[0].photos.length > 0) {
      return tripPlan.suggestions[0].photos[0];
    }
    return 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0';
  };
  
  return (
    <div className="saved-trip-card">
      <div className="card-banner" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${getBackgroundImage()})` }}>
        <h3 className="card-place-title">{selected_place}</h3>
        <button onClick={() => onDelete(trip._id)} className="card-delete-button">×</button>
      </div>
      <div className="card-summary">
        <div className="summary-item">
          <strong>Duration:</strong>
          <span>{preferences.duration} Days</span>
        </div>
        <div className="summary-item">
          <strong>Group:</strong>
          <span>{preferences.no_of_people} ({preferences.group_type})</span>
        </div>
        <div className="summary-item">
          <strong>Style:</strong>
          <span>{preferences.travel_type}</span>
        </div>
      </div>
      <button onClick={() => setIsExpanded(!isExpanded)} className="expand-button">
        {isExpanded ? 'Hide Itinerary' : 'View Full Itinerary'}
      </button>
      {isExpanded && (
        <div className="expanded-content">
          <ItineraryDisplay 
            place={selected_place}
            itinerary={itinerary}
            onSave={() => {}} 
          />
        </div>
      )}
    </div>
  );
};

export default SavedTripCard;