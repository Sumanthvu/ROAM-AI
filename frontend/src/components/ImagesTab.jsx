// src/components/ImagesTab.jsx

import React from 'react';
import './ImagesTab.css'; // Import the new dedicated CSS

const ImagesTab = ({ photos, placeName }) => {
  if (!photos || photos.length === 0) {
    return <p>No images available for this location.</p>;
  }

  return (
    <div className="gallery-container">
      <h2 className="gallery-main-title">Image Gallery for {placeName}</h2>
      <div className="gallery-grid">
        {photos.map((photo, index) => (
          <div key={index} className="gallery-image-wrapper">
            <img src={photo} alt={`${placeName} view ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesTab;