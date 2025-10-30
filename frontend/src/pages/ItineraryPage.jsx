// src/pages/ItineraryPage.jsx

import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import ItineraryDisplay from '../components/ItineraryDisplay';
import './ItineraryPage.css'; // We'll create this CSS file next

const ItineraryPage = () => {
  const location = useLocation();
  // Get trip data passed from the profile page
  const { trip } = location.state || {};

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

  const { tripPlan, createdAt } = trip;
  const { selected_place, itinerary, photos } = tripPlan;

  return (
    <div className="itinerary-page-container">
      <ItineraryDisplay
        place={selected_place}
        itinerary={itinerary}
        photos={photos || []}
        savedDate={createdAt}
        isSaved={true} // It's always a saved trip on this page
      />
    </div>
  );
};

export default ItineraryPage;