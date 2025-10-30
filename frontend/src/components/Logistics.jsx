// src/components/Logistics.jsx

import React from 'react';
import './Logistics.css'; // We will create this CSS file next

const Logistics = ({ transport, accommodation }) => {
  // Return a message if no data is available for either section
  if (!transport && !accommodation) {
    return <p>No logistics information available.</p>;
  }

  return (
    <div className="logistics-container">
      <h2 className="logistics-main-title">Logistics Guide</h2>

      {/* --- TRANSPORTATION SECTION --- */}
      {transport && transport.options?.length > 0 && (
        <>
          <h3 className="logistics-sub-title">Transportation</h3>
          <div className="logistics-grid">
            {transport.options.map((item, i) => (
              <div key={i} className="logistics-card">
                <div className="logistics-card-header">
                  <h3>{item.mode}</h3>
                </div>
                <div className="logistics-card-content">
                  <ul>
                    <li><strong>Typical Journey Time:</strong> {item.time}</li>
                    <li><strong>Estimated Cost:</strong> {item.cost}</li>
                    {item.notes && <li><strong>Notes:</strong> {item.notes}</li>}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      
      {/* --- ACCOMMODATION SECTION --- */}
      {accommodation && accommodation.stays?.length > 0 && (
        <>
          <h3 className="logistics-sub-title">Accommodation Suggestions</h3>
          <div className="logistics-grid">
            {accommodation.stays.map((item, i) => (
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
        </>
      )}

       {/* --- NEIGHBORHOOD GUIDE --- */}
      {accommodation && accommodation.neighborhoods?.length > 0 && (
        <>
          <h3 className="logistics-sub-title">Neighborhood Guide</h3>
          <div className="logistics-grid">
            {accommodation.neighborhoods.map((item, i) => (
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
        </>
      )}
    </div>
  );
};

export default Logistics;