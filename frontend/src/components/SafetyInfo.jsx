// src/components/SafetyInfo.jsx

import React from 'react';
import './InfoTabs.css'; 

const SafetyInfo = ({ safety }) => {
  if (!safety) {
    return <p>No safety information available.</p>;
  }

  return (
    <div className="info-tab-container">
      <div className="info-section">
        <h4 className="info-title">Overall Risk Level: <span className={`risk-level ${safety.overall_risk_level?.toLowerCase()}`}>{safety.overall_risk_level}</span></h4>
      </div>
      
      <div className="info-section">
        <h4 className="info-title">Common Scams to Avoid</h4>
        <ul className="info-list">
          {safety.common_scams?.map((scam, index) => <li key={index}>{scam}</li>)}
        </ul>
      </div>

      <div className="info-section">
        <h4 className="info-title">Local Laws & Norms</h4>
        <ul className="info-list">
          {safety.local_laws_and_norms?.map((law, index) => <li key={index}>{law}</li>)}
        </ul>
      </div>

      <div className="info-section">
        <h4 className="info-title">Health & Hygiene</h4>
        <ul className="info-list">
          <li><strong>Food & Water:</strong> {safety.health?.food_water_safety}</li>
          <li><strong>Altitude Note:</strong> {safety.health?.altitude_note}</li>
          <li><strong>Mosquito Advice:</strong> {safety.health?.mosquito_advice}</li>
        </ul>
      </div>

      <div className="info-section">
        <h4 className="info-title">Emergency Contacts</h4>
        <div className="contacts-grid">
          <div className="contact-item"><strong>All Emergencies:</strong> <span>{safety.emergency_contacts?.all_emergencies}</span></div>
          <div className="contact-item"><strong>Police:</strong> <span>{safety.emergency_contacts?.police}</span></div>
          <div className="contact-item"><strong>Ambulance:</strong> <span>{safety.emergency_contacts?.ambulance}</span></div>
          <div className="contact-item"><strong>Fire:</strong> <span>{safety.emergency_contacts?.fire}</span></div>
        </div>
      </div>
    </div>
  );
};

export default SafetyInfo;