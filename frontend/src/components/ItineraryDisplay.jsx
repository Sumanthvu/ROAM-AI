// src/components/ItineraryDisplay.jsx

import React, { useState } from 'react';
import './ItineraryDisplay.css';
import ItineraryTimeline from './ItineraryTimeline';
import SafetyInfo from './SafetyInfo';
import PackingList from './PackingList';
import BudgetBreakdown from './BudgetBreakdown';
import ImagesTab from './ImagesTab';
import ReviewsInfo from './ReviewsInfo';
import TransportInfo from './TransportInfo';
import AccommodationInfo from './AccommodationInfo';

const ItineraryDisplay = ({ place, itinerary, photos, isSaved, onSave, onUnsave }) => {
  const [activeTab, setActiveTab] = useState('timeline');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'timeline': return <ItineraryTimeline timeline={itinerary.itinerary} />;
      case 'images': return <ImagesTab photos={photos} placeName={place} />;
      case 'safety': return <SafetyInfo safety={itinerary.safety} />;
      case 'packing': return <PackingList packing={itinerary.packing} />;
      case 'budget': return <BudgetBreakdown budget={itinerary.budget} />;
      case 'reviews': return <ReviewsInfo reviews={itinerary.reviews} />;
      case 'transport': return <TransportInfo transport={itinerary.transport} />;
      case 'accommodation': return <AccommodationInfo accommodation={itinerary.accommodation} />;
      default: return <p>Please select a tab.</p>;
    }
  };

  return (
    <div className="itinerary-container">
      <div className="itinerary-header">
        <h2 className="itinerary-title">Your Custom Itinerary for {place}</h2>
        {isSaved ? (
          <button onClick={onUnsave} className="save-trip-button unsave">Unsave Trip</button>
        ) : (
          <button onClick={onSave} className="save-trip-button">Save Trip to Profile</button>
        )}
      </div>

      <div className="itinerary-tabs">
        <button onClick={() => setActiveTab('timeline')} className={activeTab === 'timeline' ? 'active' : ''}>Timeline</button>
        <button onClick={() => setActiveTab('images')} className={activeTab === 'images' ? 'active' : ''}>Images</button>
        <button onClick={() => setActiveTab('transport')} className={activeTab === 'transport' ? 'active' : ''}>Logistics</button>
        <button onClick={() => setActiveTab('accommodation')} className={activeTab === 'accommodation' ? 'active' : ''}>Stays</button>
        <button onClick={() => setActiveTab('reviews')} className={activeTab === 'reviews' ? 'active' : ''}>Reviews</button>
        <button onClick={() => setActiveTab('packing')} className={activeTab === 'packing' ? 'active' : ''}>Packing</button>
        <button onClick={() => setActiveTab('safety')} className={activeTab === 'safety' ? 'active' : ''}>Safety</button>
        <button onClick={() => setActiveTab('budget')} className={activeTab === 'budget' ? 'active' : ''}>Budget</button>
      </div>

      <div className="itinerary-tab-content">
        {itinerary ? renderTabContent() : <p>Loading itinerary details...</p>}
      </div>
    </div>
  );
};

export default ItineraryDisplay;