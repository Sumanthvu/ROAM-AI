// src/components/AccommodationInfo.jsx
import React from 'react';
import './AccommodationInfo.css'; // New dedicated CSS

const AccommodationInfo = ({ accommodation }) => {
  if (!accommodation) return <p>No accommodation information available.</p>;
  return (
    <div className="logistics-container">
      <h2 className="logistics-main-title">Accommodation Guide</h2>

      <h3 className="logistics-sub-title">Stay Suggestions</h3>
      <div className="logistics-grid">
        {accommodation.stays?.map((item, i) => (
          <div key={i} className="logistics-card">
            <div className="logistics-card-header">
              <h3>{item.name} <span className="card-tag">{item.type}</span></h3>
            </div>
            <div className="logistics-card-content">
              <ul>
                <li><strong>Area:</strong> {item.area}</li>
                <li><strong>Price:</strong> {item.approx_price_per_night}</li>
                <li><strong>Suits:</strong> {item.suits}</li>
                <li className="tip"><strong>Why Stay Here:</strong> {item.why}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>

      <h3 className="logistics-sub-title">Neighborhood Guide</h3>
       <div className="logistics-grid">
        {accommodation.neighborhoods?.map((item, i) => (
          <div key={i} className="logistics-card">
             <div className="logistics-card-header">
                <h3>{item.name}</h3>
             </div>
             <div className="logistics-card-content">
               <ul>
                 <li><strong>Good For:</strong> {item.good_for?.join(', ')}</li>
                 <li><strong>Avoid If:</strong> {item.avoid_if?.join(', ')}</li>
               </ul>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AccommodationInfo;