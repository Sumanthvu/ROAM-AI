// src/components/PackingList.jsx

import React from 'react';
import './InfoTabs.css'; 

const PackingList = ({ packing }) => {
  if (!packing) {
    return <p>No packing information available.</p>;
  }

  // A helper to render a category of items
  const renderCategory = (title, items) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="info-section">
        <h4 className="packing-category-title">{title}</h4>
        <ul className="info-list">
          {items.map((item, index) => (
            <li key={index}>
              <strong>{item.item}</strong> (Qty: {item.qty}) - <em>{item.why}</em>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="info-tab-container">
      <div className="info-section">
        <h4 className="info-title">Smart Packing List for a trip during the {packing.season}</h4>
      </div>
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