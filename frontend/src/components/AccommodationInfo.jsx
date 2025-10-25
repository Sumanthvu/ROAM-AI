// src/components/AccommodationInfo.jsx
import React from 'react';
import './InfoTabs.css';

const AccommodationInfo = ({ accommodation }) => {
  if (!accommodation) return <p>No accommodation information available.</p>;
  return (
    <div className="info-tab-container">
      <div className="info-section">
        <h4 className="info-title">Stay Suggestions</h4>
        <div className="stay-grid">
          {accommodation.stays?.map((item, i) => (
            <div key={i} className="stay-card">
              <h5>{item.name} <span>({item.type})</span></h5>
              <p><strong>Area:</strong> {item.area}</p>
              <p><strong>Price:</strong> {item.approx_price_per_night}</p>
              <p><strong>Suits:</strong> {item.suits}</p>
              <p className="tip"><strong>Why Stay Here:</strong> {item.why}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="info-section">
        <h4 className="info-title">Neighborhood Guide</h4>
        <div className="stay-grid">
          {accommodation.neighborhoods?.map((item, i) => (
            <div key={i} className="stay-card">
              <h5>{item.name}</h5>
              <p><strong>Good For:</strong> {item.good_for?.join(', ')}</p>
              <p><strong>Avoid If:</strong> {item.avoid_if?.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AccommodationInfo;