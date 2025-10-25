// src/components/BudgetBreakdown.jsx

import React from 'react';
import './InfoTabs.css'; 

const BudgetBreakdown = ({ budget }) => {
  if (!budget) {
    return <p>No budget information available.</p>;
  }

  const { budget_range, per_day_estimate_per_person, notes } = budget;

  return (
    <div className="info-tab-container">
      <div className="budget-grid">
        <div className="info-section">
          <h4 className="info-title">Total Budget Range</h4>
          <ul className="info-list">
            <li><strong>Transport:</strong> ₹{budget_range?.transport.join(' - ₹')}</li>
            <li><strong>Accommodation:</strong> ₹{budget_range?.accommodation.join(' - ₹')}</li>
            <li><strong>Food:</strong> ₹{budget_range?.food.join(' - ₹')}</li>
            <li><strong>Entertainment:</strong> ₹{budget_range?.entertainment.join(' - ₹')}</li>
          </ul>
        </div>

        <div className="info-section">
          <h4 className="info-title">Per Day Estimate (Per Person)</h4>
          <ul className="info-list">
            <li><strong>Transport:</strong> {per_day_estimate_per_person?.transport}</li>
            <li><strong>Accommodation:</strong> {per_day_estimate_per_person?.accommodation}</li>
            <li><strong>Food:</strong> {per_day_estimate_per_person?.food}</li>
            <li><strong>Entertainment:</strong> {per_day_estimate_per_person?.entertainment}</li>
            <li><strong><strong>Total:</strong> {per_day_estimate_per_person?.total}</strong></li>
          </ul>
        </div>

        {notes && notes.length > 0 && (
          <div className="info-section budget-notes">
            <h4 className="info-title">Notes</h4>
            <ul className="info-list">
              {notes.map((note, index) => <li key={index}>{note}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetBreakdown;