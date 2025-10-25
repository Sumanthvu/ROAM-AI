// src/components/ImagesTab.jsx

import React from 'react';
import './InfoTabs.css'; // We'll add styles to this file

const ImagesTab = ({ photos, placeName }) => {
  if (!photos || photos.length === 0) {
    return <p>No images available for this location.</p>;
  }

  return (
    <div className="info-tab-container">
      <div className="info-section">
        <h4 className="info-title">Image Gallery for {placeName}</h4>
        <div className="image-grid">
          {photos.map((photo, index) => (
            <div key={index} className="image-wrapper">
              <img src={photo} alt={`${placeName} view ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagesTab;