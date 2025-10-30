// src/pages/ItineraryPage.jsx

import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import ItineraryDisplay from '../components/ItineraryDisplay';
import { saveTrip, deleteTrip } from '../api/tripApi'; // Import API functions
import './ItineraryPage.css';

const ItineraryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { trip } = location.state || {};

  // --- NEW: State management for save/unsave functionality ---
  const [isSaved, setIsSaved] = useState(!!trip); // Initial state is saved
  const [currentTripId, setCurrentTripId] = useState(trip?._id);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false); // To disable button during API call

  // --- NEW: Handler to unsave the trip ---
  const handleUnsave = async () => {
    if (!currentTripId) return;
    setIsProcessing(true);
    setError('');
    try {
      await deleteTrip(currentTripId);
      setIsSaved(false);
      // Optional: Navigate away or show a persistent message after deletion
      // For now, it allows the user to re-save it.
    } catch (err) {
      setError('Failed to unsave the trip. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // --- NEW: Handler to re-save the trip ---
  const handleSave = async () => {
    // We use the original tripPlan object to re-save the trip
    if (!trip?.tripPlan) return;
    setIsProcessing(true);
    setError('');
    try {
      const response = await saveTrip(trip.tripPlan);
      if (response.success) {
        setIsSaved(true);
        setCurrentTripId(response.data._id); // Update with the new trip ID
      }
    } catch (err) {
      setError('Failed to save the trip. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Fallback if the user navigates here directly without data
  if (!trip) {
    return (
      <div className="itinerary-page-container error-container">
        <h2>Trip Data Not Found</h2>
        <p>It seems you've landed here directly. Please return to your profile to select a trip.</p>
        <Link to="/profile" className="back-link">Go to My Profile</Link>
      </div>
    );
  }

  // Destructure data after the check to ensure `trip` exists
  const { tripPlan, createdAt } = trip;
  const { selected_place, itinerary } = tripPlan;
  
  // Ensure photos is an array, providing an empty one as a fallback
  const photos = tripPlan.suggestions?.[0]?.photos || tripPlan.photos || [];


  return (
    <div className="itinerary-page-container">
      {error && <div className="message-banner error">{error}</div>}
      
      {/* --- UPDATED: Pass the new state and handlers to the display component --- */}
      <ItineraryDisplay
        place={selected_place}
        itinerary={itinerary}
        photos={photos}
        savedDate={createdAt} // This prop can be used for display purposes
        isSaved={isSaved} 
        onSave={handleSave}
        onUnsave={handleUnsave}
        // Add a disabled prop to the button if it's processing
        isSaving={isProcessing} 
      />
    </div>
  );
};

export default ItineraryPage;