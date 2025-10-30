// src/components/SafetyInfo.jsx

import React from 'react';
import './SafetyInfo.css'; // Import the new dedicated CSS file

// SVG Icons to match the UI aesthetic
const RiskIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#8a9cb4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.5 12H17" stroke="#8a9cb4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 12H12.5" stroke="#8a9cb4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HealthIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="#8a9cb4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const PhoneIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="#8a9cb4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const SafetyInfo = ({ safety }) => {
  if (!safety) {
    return <p>No safety information available.</p>;
  }

  const getRiskClass = (level) => {
    if (!level) return 'moderate';
    const risk = level.toLowerCase();
    if (risk === 'low') return 'low';
    if (risk === 'high') return 'high';
    return 'moderate';
  };

  return (
    <div className="safety-info-container">
      <h2 className="safety-main-title">Safety Guidance for Your Trip</h2>

      <div className="safety-grid">
        {/* Overall Risk Card */}
        <div className="safety-card">
          <div className="safety-card-header">
            <RiskIcon />
            <h3>Overall Risk</h3>
          </div>
          <div className="safety-card-content">
            <p className={`risk-level-value risk-${getRiskClass(safety.overall_risk_level)}`}>
              {safety.overall_risk_level}
            </p>
          </div>
        </div>

        {/* Common Scams Card - Full Width */}
        <div className="safety-card full-width">
          <div className="safety-card-header">
            <h3>Common Scams to Avoid</h3>
          </div>
          <div className="safety-card-content">
            <ul>
              {safety.common_scams?.map((scam, index) => <li key={index}>{scam}</li>)}
            </ul>
          </div>
        </div>
        
        {/* Local Laws Card - Full Width */}
        <div className="safety-card full-width">
          <div className="safety-card-header">
            <h3>Local Norms & Laws</h3>
          </div>
          <div className="safety-card-content">
            <ul>
              {safety.local_laws_and_norms?.map((law, index) => <li key={index}>{law}</li>)}
            </ul>
          </div>
        </div>

        {/* Health Advice Card */}
        <div className="safety-card">
          <div className="safety-card-header">
            <HealthIcon />
            <h3>Health Advice</h3>
          </div>
          <div className="safety-card-content">
            <ul>
                <li><strong>Food & Water:</strong> {safety.health?.food_water_safety}</li>
                <li><strong>Altitude Note:</strong> {safety.health?.altitude_note}</li>
                <li><strong>Mosquito Advice:</strong> {safety.health?.mosquito_advice}</li>
            </ul>
          </div>
        </div>

        {/* Emergency Contacts Card */}
        <div className="safety-card emergency-card">
          <div className="safety-card-header">
             <PhoneIcon />
            <h3>Emergency Contacts</h3>
          </div>
          <div className="safety-card-content">
             <div className="contacts-grid">
                <div><strong>All Emergencies:</strong> <span>{safety.emergency_contacts?.all_emergencies}</span></div>
                <div><strong>Police:</strong> <span>{safety.emergency_contacts?.police}</span></div>
                <div><strong>Ambulance:</strong> <span>{safety.emergency_contacts?.ambulance}</span></div>
                <div><strong>Fire:</strong> <span>{safety.emergency_contacts?.fire}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyInfo;