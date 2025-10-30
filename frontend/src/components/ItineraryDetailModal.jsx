import React from 'react';
import ItineraryDisplay from './ItineraryDisplay';
import './ItineraryDetailModal.css';

const ItineraryDetailModal = ({ trip, onClose }) => {
  if (!trip) return null;

  const { tripPlan } = trip;
  const { selected_place, itinerary } = tripPlan;

  // The main change is wrapping the ItineraryDisplay in a container
  // to allow for independent scrolling within the styled modal.
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>×</button>
        <div className="modal-content-scrollable">
          <ItineraryDisplay
            place={selected_place}
            itinerary={itinerary}
            onSave={() => {}} // onSave is not needed in the modal
          />
        </div>
      </div>
    </div>
  );
};

export default ItineraryDetailModal;