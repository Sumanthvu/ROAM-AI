// src/components/PrintableItinerary.jsx

import React from 'react';
import './PrintableItinerary.css';
import ItineraryTimeline from './ItineraryTimeline';
import SafetyInfo from './SafetyInfo';
import PackingList from './PackingList';
import BudgetBreakdown from './BudgetBreakdown';
import ImagesTab from './ImagesTab';
import Logistics from './Logistics';
import ReviewsInfo from './ReviewsInfo'; // Added for a more complete PDF

const PrintableItinerary = React.forwardRef(({ itinerary, place, photos, savedDate }, ref) => {
    
//   const formattedDate = new Date(savedDate).toLocaleString('en-US', {
//     year: 'numeric', month: 'long', day: 'numeric'
//   });

const formattedDate = savedDate
  ? new Date(savedDate).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  : new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });


  return (
    <div ref={ref} className="printable-container">
      <div className="printable-header">
        <h1>Itinerary for Your Trip to {place}</h1>
        <p>Generated on: {formattedDate}</p>
      </div>

      <div className="printable-section" data-section-title="Daily Itinerary">
        <ItineraryTimeline timeline={itinerary.itinerary} />
      </div>

      <div className="printable-section" data-section-title="Logistics">
        <Logistics transport={itinerary.transport} accommodation={itinerary.accommodation} />
      </div>

      <div className="printable-section" data-section-title="Safety Information">
        <SafetyInfo safety={itinerary.safety} />
      </div>
      
      <div className="printable-section" data-section-title="Budget Breakdown">
        <BudgetBreakdown budget={itinerary.budget} />
      </div>
      
      <div className="printable-section" data-section-title="Packing List">
        <PackingList packing={itinerary.packing} />
      </div>
      
      <div className="printable-section" data-section-title="Attraction & Restaurant Reviews">
        <ReviewsInfo reviews={itinerary.reviews} />
      </div>

      <div className="printable-section" data-section-title="Image Gallery">
        <ImagesTab photos={photos} placeName={place} />
      </div>
    </div>
  );
});

export default PrintableItinerary;