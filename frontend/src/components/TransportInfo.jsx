// src/components/TransportInfo.jsx
import React from 'react';
import './InfoTabs.css';

const TransportInfo = ({ transport }) => {
  if (!transport) return <p>No transport information available.</p>;
  return (
    <div className="info-tab-container">
      <div className="info-section">
        <h4 className="info-title">Getting There (Intercity)</h4>
        <div className="transport-list">
          {transport.intercity?.map((item, i) => (
            <div key={i} className="transport-item">
              <h5>{item.mode}</h5>
              <p><strong>From/To:</strong> {item.from} ↔ {item.to}</p>
              <p><strong>Time:</strong> {item.time} | <strong>Cost:</strong> {item.approx_cost}</p>
              <p className="tip"><strong>Pro Tip:</strong> {item.pro_tip}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="info-section">
        <h4 className="info-title">Getting Around (In-City)</h4>
        <div className="transport-list">
          {transport.in_city?.map((item, i) => (
            <div key={i} className="transport-item">
              <h5>{item.mode}</h5>
              <p><strong>Best For:</strong> {item.when_to_use}</p>
              <p><strong>Coverage:</strong> {item.coverage} | <strong>Cost:</strong> {item.approx_cost}</p>
              <p className="tip"><strong>Pro Tip:</strong> {item.pro_tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TransportInfo;