// src/components/PackingList.jsx

import React from 'react';
import './PackingList.css'; // New dedicated CSS

const PackingList = ({ packing }) => {
  if (!packing) {
    return <p>No packing information available.</p>;
  }

  const renderCategory = (title, items) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="packing-card">
        <div className="packing-card-header">
          <h3>{title}</h3>
        </div>
        <div className="packing-card-content">
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <strong>{item.item}</strong> (Qty: {item.qty})
                <span className="packing-reason">- {item.why}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="packing-container">
      <h2 className="packing-main-title">
        Smart Packing List for {packing.season}
      </h2>
      <div className="packing-grid">
        {renderCategory("Essentials", packing.essentials)}
        {renderCategory("Clothing", packing.clothing)}
        {renderCategory("Footwear", packing.footwear)}
        {renderCategory("Gadgets & Electronics", packing.gadgets)}
        {renderCategory("Documents & Money", packing.documents_money)}
      </div>
    </div>
  );
};

export default PackingList;