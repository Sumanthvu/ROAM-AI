// src/components/ItineraryDisplay.jsx

import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

/**
 * A component to display the final trip itinerary.
 * It receives all data and functions as props from its parent (DashboardPage).
 * @param {object} props
 * @param {string} props.place - The name of the destination.
 * @param {object} props.itinerary - The comprehensive itinerary object.
 * @param {string[]} props.photos - An array of photo URLs for the gallery.
 * @param {boolean} props.isSaved - A boolean indicating if the trip is currently saved.
 * @param {function} props.onSave - The function to call when the "Save" button is clicked.
 * @param {function} props.onUnsave - The function to call when the "Unsave" button is clicked.
 */
const ItineraryDisplay = ({ place, itinerary, photos, isSaved, onSave, onUnsave }) => {
  const [activeTab, setActiveTab] = useState('timeline');
  const [isDownloading, setIsDownloading] = useState(false);
  const printableRef = useRef();

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    const element = printableRef.current;
    if (!element) {
        setIsDownloading(false);
        return;
    }
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
        <PrintableItinerary ref={printableRef} itinerary={itinerary} place={place} photos={photos} />
      </div>
      <div className="itinerary-container">
        <div className="itinerary-header">
          <div>
            <h3 className="itinerary-title">Your Trip to <h1 className='mini-title'> {place} </h1> </h3>
            <p className="itinerary-subtitle">
              {isSaved ? 'This trip is saved to your profile.' : 'This trip is not saved to your profile.'}
            </p>
          </div>
          
          <div className="itinerary-actions">
            {/* --- THIS BUTTON IS NOW CORRECTLY WIRED --- */}
            {/* It calls the appropriate function passed down from DashboardPage */}
            <button 
              onClick={isSaved ? onUnsave : onSave} 
              className={`save-button action-button ${isSaved ? 'save-button-unsave' : 'save-button-save'}`}
            >
              {isSaved ? 'Unsave Trip' : 'Save to Profile'}
            </button>
            
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