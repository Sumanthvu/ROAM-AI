// src/components/ItineraryDisplay.jsx

import React, { useState } from 'react';
import './ItineraryDisplay.css';
import ItineraryTimeline from './ItineraryTimeline';
import SafetyInfo from './SafetyInfo';
import PackingList from './PackingList';
import BudgetBreakdown from './BudgetBreakdown';

const ItineraryDisplay = ({ place, itinerary, isSaved, onSave, onUnsave }) => {
  const [activeTab, setActiveTab] = useState('timeline');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'timeline': return <ItineraryTimeline timeline={itinerary.itinerary} />;
      case 'safety': return <SafetyInfo safety={itinerary.safety} />;
      case 'packing': return <PackingList packing={itinerary.packing} />;
      case 'budget': return <BudgetBreakdown budget={itinerary.budget} />;
      default: return null;
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
        <button onClick={() => setActiveTab('safety')} className={activeTab === 'safety' ? 'active' : ''}>Safety</button>
        <button onClick={() => setActiveTab('packing')} className={activeTab === 'packing' ? 'active' : ''}>Packing List</button>
        <button onClick={() => setActiveTab('budget')} className={activeTab === 'budget' ? 'active' : ''}>Budget</button>
      </div>

      <div className="itinerary-tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ItineraryDisplay;