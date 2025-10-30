// src/components/ItineraryDisplay.jsx

import React, { useState, useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Import the API functions
import { saveTrip, deleteTrip } from '../api/tripApi';

// Import child components
import './ItineraryDisplay.css';
import ItineraryTimeline from './ItineraryTimeline';
import SafetyInfo from './SafetyInfo';
import PackingList from './PackingList';
import BudgetBreakdown from './BudgetBreakdown';
import ImagesTab from './ImagesTab';
import ReviewsInfo from './ReviewsInfo';
import Logistics from './Logistics';
import PrintableItinerary from './PrintableItinerary';

// The function signature is updated to accept the new props alongside the old ones.
const ItineraryDisplay = ({ place, itinerary, photos, savedDate, tripId, tripPlan, onSaveStatusChange }) => {
  const [activeTab, setActiveTab] = useState('timeline');
  const [isDownloading, setIsDownloading] = useState(false);
  const printableRef = useRef();

  // --- NEW: State for Save/Unsave functionality, initialized by the new 'tripId' prop ---
  const [isSaved, setIsSaved] = useState(!!tripId);
  const [isSaving, setIsSaving] = useState(false);
  const [currentTripId, setCurrentTripId] = useState(tripId);

  // Keep the component's state synchronized if the props change
  useEffect(() => {
    setIsSaved(!!tripId);
    setCurrentTripId(tripId);
  }, [tripId]);

  const formattedDate = new Date(savedDate).toLocaleString('en-US', {
    year: 'numeric', month: '2-digit', day: '2-digit',
  });
  
  // --- NEW: Handler function for the save/unsave button ---
  const handleToggleSave = async () => {
    setIsSaving(true);
    try {
      if (isSaved) {
        // Use 'currentTripId' to delete the trip
        await deleteTrip(currentTripId);
        setIsSaved(false);
        if (onSaveStatusChange) onSaveStatusChange(); // Notify parent
      } else {
        // Use the 'tripPlan' object to save the new trip
        const response = await saveTrip(tripPlan);
        if (response.success) {
          const newTrip = response.data;
          setIsSaved(true);
          setCurrentTripId(newTrip._id); // Update the ID for future deletes
          if (onSaveStatusChange) onSaveStatusChange(); // Notify parent
        }
      }
    } catch (error) {
      console.error("Failed to update trip status:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // --- (The rest of your logic remains exactly the same) ---

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    const element = printableRef.current;
    if (!element) return setIsDownloading(false);
    const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: false });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const ratio = canvas.width / canvas.height;
    const imgHeight = pdfWidth / ratio;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
    pdf.save(`Itinerary for ${place}.pdf`);
    setIsDownloading(false);
  };

  const renderTabContent = () => {
    if (!itinerary) return <p>Loading content...</p>;
    switch (activeTab) {
      case 'timeline': return <ItineraryTimeline timeline={itinerary.itinerary} />;
      case 'images': return <ImagesTab photos={photos} placeName={place} />;
      case 'safety': return <SafetyInfo safety={itinerary.safety} />;
      case 'packing': return <PackingList packing={itinerary.packing} />;
      case 'budget': return <BudgetBreakdown budget={itinerary.budget} />;
      case 'reviews': return <ReviewsInfo reviews={itinerary.reviews} />;
      case 'transport': return <Logistics transport={itinerary.transport} accommodation={itinerary.accommodation} />;
      default: return <p>Please select a tab.</p>;
    }
  };
  
  // Guard clause to prevent crashes if essential data is not yet loaded.
  if (!itinerary || !place) {
    return <div className="itinerary-container"><p>Loading itinerary...</p></div>;
  }

  return (
    <>
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <PrintableItinerary ref={printableRef} itinerary={itinerary} place={place} photos={photos} savedDate={savedDate} />
      </div>
      <div className="itinerary-container">
        <div className="itinerary-header">
          <div>
            <h3 className="itinerary-title">Your Trip to <h1 className='mini-title'> {place} </h1> </h3>
            <p className="itinerary-subtitle">
              {isSaved ? `Saved on: ${formattedDate}` : 'This trip is not saved to your profile.'}
            </p>
          </div>
          
          {/* --- UPDATED: Container for both buttons --- */}
          <div className="itinerary-actions">
            {/* <button onClick={handleToggleSave} disabled={isSaving} className={`action-button ${isSaved ? 'save-button-unsave' : 'save-button-save'}`}>
              {isSaving ? '...' : (isSaved ? 'Unsave Trip' : 'Save to Profile')}
            </button>
            <br />
            <br /> */}
            <button onClick={handleDownloadPdf} disabled={isDownloading} className="action-button download-button">
              {isDownloading ? 'Downloading...' : 'Download PDF'}
            </button>
          </div>
        </div>

        <div className="itinerary-tabs">
          <button onClick={() => setActiveTab('timeline')} className={activeTab === 'timeline' ? 'active' : ''}>Itinerary</button>
          <button onClick={() => setActiveTab('images')} className={activeTab === 'images' ? 'active' : ''}>Gallery</button>
          <button onClick={() => setActiveTab('safety')} className={activeTab === 'safety' ? 'active' : ''}>Safety</button>
          <button onClick={() => setActiveTab('packing')} className={activeTab === 'packing' ? 'active' : ''}>Packing</button>
          <button onClick={() => setActiveTab('budget')} className={activeTab === 'budget' ? 'active' : ''}>Budget</button>
          <button onClick={() => setActiveTab('transport')} className={activeTab === 'transport' ? 'active' : ''}>Logistics</button>
        </div>

        <div className="itinerary-tab-content">
          {renderTabContent()}
        </div>
      </div>
    </>
  );
};

export default ItineraryDisplay;