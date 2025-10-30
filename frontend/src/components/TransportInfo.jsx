// src/components/TransportInfo.jsx
import React from 'react';
import './TransportInfo.css'; // New dedicated CSS

const TransportInfo = ({ transport }) => {
  if (!transport) return <p>No transport information available.</p>;

  return (
    <div className="logistics-container">
      <h2 className="logistics-main-title">Transportation Guide</h2>
      <div className="logistics-grid">
        {transport.options?.map((item, i) => (
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
    </div>
  );
};

export default TransportInfo;