// src/components/ItineraryDetailModal.jsx

import React from "react";
import ItineraryDisplay from "./ItineraryDisplay";
import "./ItineraryDetailModal.css";

// It now accepts an 'onSave' prop from its parent (e.g., ProfilePage)
const ItineraryDetailModal = ({ trip, onClose, onSave }) => {
  if (!trip) return null;

  const { tripPlan, savedDate } = trip;
  const { selected_place, itinerary, photos } = tripPlan;

  // This function will be passed to ItineraryDisplay to notify us when a save/unsave happens.
  const handleSaveStatusChange = () => {
    if (onSave) {
      onSave(); // This calls the function in the parent component to refresh the trip list.
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          ×
        </button>
        <div className="modal-content-scrollable">
          <ItineraryDisplay
            // --- EXISTING PROPS (UNCHANGED) ---
            place={selected_place}
            itinerary={itinerary}
            photos={photos}
            savedDate={savedDate}

            // --- NEW PROPS ADDED FOR SAVE FUNCTIONALITY ---
            tripId={trip._id} // The ID is needed to know if it's saved and to delete it.
            tripPlan={tripPlan} // The full plan is needed to save it.
            onSaveStatusChange={handleSaveStatusChange} // The callback function.
          />
        </div>
      </div>
    </div>
  );
};

export default ItineraryDetailModal;