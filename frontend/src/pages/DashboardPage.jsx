// // src/pages/DashboardPage.jsx
// // --- VERSION 1: LIVE ML MODEL ---

// import React, { useState } from 'react';
// import './DashboardPage.css';
// import LoadingSpinner from '../components/LoadingSpinner';
// import SuggestionCard from '../components/SuggestionCard';
// import LocalInfoSelector from '../components/LocalInfoSelector';
// import ItineraryDisplay from '../components/ItineraryDisplay';
// import axiosClient from '../api/axiosClient';
// import axiosMlClient from '../api/axiosMlClient';
// import { useAuth } from '../context/AuthContext';

// const DashboardPage = () => {
//   const [preferences, setPreferences] = useState({
//     travel_type: 'Adventure', total_budget: '50000', no_of_people: '2', group_type: 'friends', duration: '5', interests: 'mountains, trekking', start_date: new Date().toISOString().split('T')[0], planning_style: 'Holiday based',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');

//   const [flowStep, setFlowStep] = useState('preferences');
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedPlace, setSelectedPlace] = useState(null);
//   const [localInfo, setLocalInfo] = useState({ top_attractions: [], local_cuisine: [] });
//   const [selectedAttractions, setSelectedAttractions] = useState([]);
//   const [selectedCuisines, setSelectedCuisines] = useState([]);
//   const [finalItinerary, setFinalItinerary] = useState(null);

//   const { user } = useAuth();

//   const handleInputChange = (e) => {
//     setPreferences({ ...preferences, [e.target.name]: e.target.value });
//   };

//   const handlePreferencesSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     const payload = {
//       ...preferences,
//       total_budget: parseInt(preferences.total_budget, 10), no_of_people: parseInt(preferences.no_of_people, 10), duration: parseInt(preferences.duration, 10), budget_range: null,
//     };
//     try {
//       const response = await axiosMlClient.post('/generate', payload);
//       if (response.data && response.data.places && response.data.places.length > 0) {
//         setSuggestions(response.data.places);
//         setFlowStep('suggestions');
//       } else {
//         setError('No suggestions found. Please try different preferences.');
//       }
//     } catch (err) {
//       let specificError = 'Failed to fetch suggestions. Please check your input and try again.';
//       if (err.response?.data?.detail) {
//         if (Array.isArray(err.response.data.detail) && err.response.data.detail[0]?.msg) {
//           const errorDetail = err.response.data.detail[0];
//           specificError = `${errorDetail.msg} (field: ${errorDetail.loc[1]})`;
//         } else {
//           specificError = JSON.stringify(err.response.data.detail);
//         }
//       }
//       setError(specificError);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePlaceSelect = async (place) => {
//     setLoading(true);
//     setError('');
//     setSelectedPlace(place.place);

//     const requestBody = {
//       preferences: { ...preferences, total_budget: parseInt(preferences.total_budget, 10), no_of_people: parseInt(preferences.no_of_people, 10), duration: parseInt(preferences.duration, 10), },
//       selected_place: place.place,
//     };
//     try {
//       const response = await axiosMlClient.post('/local-info', requestBody);
//       if (response.data && response.data.formatted) {
//         setLocalInfo(response.data.formatted);
//         setFlowStep('local_info');
//       } else {
//         setError('Could not fetch local details for the selected place.');
//       }
//     } catch (err) {
//       setError('An error occurred while fetching local details.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLocalInfoSubmit = async () => {
//     setLoading(true);
//     setError('');
    
//     const requestBody = {
//       preferences: { ...preferences, total_budget: parseInt(preferences.total_budget, 10), no_of_people: parseInt(preferences.no_of_people, 10), duration: parseInt(preferences.duration, 10), },
//       selected_place: selectedPlace,
//       selected_attractions: selectedAttractions,
//       selected_cuisines: selectedCuisines,
//     };
//     try {
//       const response = await axiosMlClient.post('/schedule-trip', requestBody);
//       if (response.data && response.data.formatted) {
//         setFinalItinerary(response.data.formatted);
//         setFlowStep('itinerary');
//       } else {
//         setError('Could not generate the final itinerary.');
//       }
//     } catch (err) {
//       setError('An error occurred while generating the itinerary.');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const handleSaveTrip = async () => {
//     if (!user) {
//       setError("You must be logged in to save a trip.");
//       return;
//     }
//     setLoading(true);
//     setError('');
//     setMessage('');
    
//     const tripPlanToSave = {
//       preferences, selected_place: selectedPlace, suggestions, local_info: localInfo, selected_attractions: selectedAttractions, selected_cuisines: selectedCuisines, itinerary: finalItinerary,
//     };
//     try {
//       const response = await axiosClient.post('/trips', { tripPlan: tripPlanToSave });
//       setMessage(response.data.message || "Trip saved successfully!");
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to save trip.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderContent = () => {
//     switch (flowStep) {
//       case 'preferences':
//         return (
//           <div className="form-section">
//             <h1 className="dashboard-title">Plan Your Next Adventure</h1>
//             <p className="dashboard-subtitle">Tell us your preferences, and we'll suggest the perfect destinations for you.</p>
//             <form onSubmit={handlePreferencesSubmit} className="preferences-form">
//               <div className="form-grid">
//                 <div className="form-group"><label htmlFor="travel_type">Travel Style</label><select name="travel_type" id="travel_type" value={preferences.travel_type} onChange={handleInputChange}><option value="Adventure">Adventure</option><option value="Leisure">Leisure</option><option value="Cultural">Cultural</option><option value="Romantic">Romantic</option><option value="Family">Family</option></select></div>
//                 <div className="form-group"><label htmlFor="total_budget">Total Budget (INR)</label><input type="number" name="total_budget" id="total_budget" placeholder="e.g., 50000" value={preferences.total_budget} onChange={handleInputChange} required /></div>
//                 <div className="form-group"><label htmlFor="no_of_people">Number of People</label><input type="number" name="no_of_people" id="no_of_people" min="1" max="30" value={preferences.no_of_people} onChange={handleInputChange} required /></div>
//                 <div className="form-group"><label htmlFor="group_type">Group Type</label><select name="group_type" id="group_type" value={preferences.group_type} onChange={handleInputChange}><option value="friends">Friends</option><option value="family">Family</option><option value="couple">Couple</option><option value="solo">Solo</option></select></div>
//                 <div className="form-group"><label htmlFor="duration">Duration (in days)</label><input type="number" name="duration" id="duration" min="1" max="45" placeholder="e.g., 5" value={preferences.duration} onChange={handleInputChange} required /></div>
//                 <div className="form-group"><label htmlFor="start_date">Start Date</label><input type="date" name="start_date" id="start_date" value={preferences.start_date} onChange={handleInputChange} /></div>
//                 <div className="form-group full-width"><label htmlFor="interests">Interests</label><input type="text" name="interests" id="interests" placeholder="e.g., mountains, trekking, beaches" value={preferences.interests} onChange={handleInputChange} required /></div>
//                 <div className="form-group full-width"><label htmlFor="planning_style">Planning Style</label><select name="planning_style" id="planning_style" value={preferences.planning_style} onChange={handleInputChange}><option value="Not specified">Not specified</option><option value="Holiday based">Holiday based</option><option value="Season based">Season based</option></select></div>
//               </div>
//               <button type="submit" className="submit-button" disabled={loading}>Get Suggestions</button>
//             </form>
//           </div>
//         );
//       case 'suggestions':
//         return (
//           <div className="suggestions-section">
//             <h2 className="suggestions-title">Here are some suggestions for you:</h2>
//             <div className="suggestions-grid">
//               {suggestions.map((suggestion, index) => (
//                 <SuggestionCard key={index} suggestion={suggestion} onSelect={handlePlaceSelect} />
//               ))}
//             </div>
//           </div>
//         );
//       case 'local_info':
//         return (
//           <div className="local-info-section">
//             <LocalInfoSelector
//               place={selectedPlace}
//               localInfo={localInfo}
//               selectedAttractions={selectedAttractions}
//               setSelectedAttractions={setSelectedAttractions}
//               selectedCuisines={selectedCuisines}
//               setSelectedCuisines={setSelectedCuisines}
//             />
//             <button onClick={handleLocalInfoSubmit} className="submit-button" disabled={loading}>
//               Create My Itinerary
//             </button>
//           </div>
//         );
//       case 'itinerary':
//         return (
//           <ItineraryDisplay 
//             place={selectedPlace}
//             itinerary={finalItinerary}
//             onSave={handleSaveTrip}
//           />
//         );
//       default:
//         return <div>Something went wrong.</div>;
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       {loading && <LoadingSpinner />}
//       {message && <div className="message-banner success">{message}</div>}
//       {error && <div className="message-banner error">{error}</div>}
//       {renderContent()}
//     </div>
//   );
// };

// export default DashboardPage;







// src/pages/DashboardPage.jsx
// --- VERSION 2: MOCK DATA ONLY ---

import React, { useState } from 'react';
import './DashboardPage.css';
import LoadingSpinner from '../components/LoadingSpinner';
import SuggestionCard from '../components/SuggestionCard';
import LocalInfoSelector from '../components/LocalInfoSelector';
import ItineraryDisplay from '../components/ItineraryDisplay';
import { mockSuggestions, mockLocalInfo, mockItinerary } from '../api/mockData';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const [preferences, setPreferences] = useState({
    travel_type: 'Adventure', total_budget: '50000', no_of_people: '2', group_type: 'friends', duration: '5', interests: 'mountains, trekking', start_date: new Date().toISOString().split('T')[0], planning_style: 'Holiday based',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [flowStep, setFlowStep] = useState('preferences');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [localInfo, setLocalInfo] = useState({ top_attractions: [], local_cuisine: [] });
  const [selectedAttractions, setSelectedAttractions] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [finalItinerary, setFinalItinerary] = useState(null);

  const { user } = useAuth();

  const handleInputChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const handlePreferencesSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    setSuggestions(mockSuggestions.places);
    setFlowStep('suggestions');
    setLoading(false);
  };

  const handlePlaceSelect = async (place) => {
    setLoading(true);
    setError('');
    setSelectedPlace(place.place);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    setLocalInfo(mockLocalInfo.formatted);
    setFlowStep('local_info');
    setLoading(false);
  };

  const handleLocalInfoSubmit = async () => {
    setLoading(true);
    setError('');
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    setFinalItinerary(mockItinerary.formatted);
    setFlowStep('itinerary');
    setLoading(false);
  };
  
  const handleSaveTrip = async () => {
    if (!user) {
      setError("You must be logged in to save a trip.");
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');
    
    const tripPlanToSave = {
      preferences, selected_place: selectedPlace, suggestions, local_info: localInfo, selected_attractions: selectedAttractions, selected_cuisines: selectedCuisines, itinerary: finalItinerary,
    };
    try {
      const response = await axiosClient.post('/trips', { tripPlan: tripPlanToSave });
      setMessage(response.data.message || "Trip saved successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save trip.");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (flowStep) {
      case 'preferences':
        return (
          <div className="form-section">
            <h1 className="dashboard-title">Plan Your Next Adventure</h1>
            <p className="dashboard-subtitle">Tell us your preferences, and we'll suggest the perfect destinations for you.</p>
            <form onSubmit={handlePreferencesSubmit} className="preferences-form">
              <div className="form-grid">
                <div className="form-group"><label htmlFor="travel_type">Travel Style</label><select name="travel_type" id="travel_type" value={preferences.travel_type} onChange={handleInputChange}><option value="Adventure">Adventure</option><option value="Leisure">Leisure</option><option value="Cultural">Cultural</option><option value="Romantic">Romantic</option><option value="Family">Family</option></select></div>
                <div className="form-group"><label htmlFor="total_budget">Total Budget (INR)</label><input type="number" name="total_budget" id="total_budget" placeholder="e.g., 50000" value={preferences.total_budget} onChange={handleInputChange} required /></div>
                <div className="form-group"><label htmlFor="no_of_people">Number of People</label><input type="number" name="no_of_people" id="no_of_people" min="1" max="30" value={preferences.no_of_people} onChange={handleInputChange} required /></div>
                <div className="form-group"><label htmlFor="group_type">Group Type</label><select name="group_type" id="group_type" value={preferences.group_type} onChange={handleInputChange}><option value="friends">Friends</option><option value="family">Family</option><option value="couple">Couple</option><option value="solo">Solo</option></select></div>
                <div className="form-group"><label htmlFor="duration">Duration (in days)</label><input type="number" name="duration" id="duration" min="1" max="45" placeholder="e.g., 5" value={preferences.duration} onChange={handleInputChange} required /></div>
                <div className="form-group"><label htmlFor="start_date">Start Date</label><input type="date" name="start_date" id="start_date" value={preferences.start_date} onChange={handleInputChange} /></div>
                <div className="form-group full-width"><label htmlFor="interests">Interests</label><input type="text" name="interests" id="interests" placeholder="e.g., mountains, trekking, beaches" value={preferences.interests} onChange={handleInputChange} required /></div>
                <div className="form-group full-width"><label htmlFor="planning_style">Planning Style</label><select name="planning_style" id="planning_style" value={preferences.planning_style} onChange={handleInputChange}><option value="Not specified">Not specified</option><option value="Holiday based">Holiday based</option><option value="Season based">Season based</option></select></div>
              </div>
              <button type="submit" className="submit-button" disabled={loading}>Get Suggestions</button>
            </form>
          </div>
        );
      case 'suggestions':
        return (
          <div className="suggestions-section">
            <h2 className="suggestions-title">Here are some suggestions for you:</h2>
            <div className="suggestions-grid">
              {suggestions.map((suggestion, index) => (
                <SuggestionCard key={index} suggestion={suggestion} onSelect={handlePlaceSelect} />
              ))}
            </div>
          </div>
        );
      case 'local_info':
        return (
          <div className="local-info-section">
            <LocalInfoSelector
              place={selectedPlace}
              localInfo={localInfo}
              selectedAttractions={selectedAttractions}
              setSelectedAttractions={setSelectedAttractions}
              selectedCuisines={selectedCuisines}
              setSelectedCuisines={setSelectedCuisines}
            />
            <button onClick={handleLocalInfoSubmit} className="submit-button" disabled={loading}>
              Create My Itinerary
            </button>
          </div>
        );
      case 'itinerary':
        return (
          <ItineraryDisplay 
            place={selectedPlace}
            itinerary={finalItinerary}
            onSave={handleSaveTrip}
          />
        );
      default:
        return <div>Something went wrong.</div>;
    }
  };

  return (
    <div className="dashboard-container">
      {loading && <LoadingSpinner />}
      {message && <div className="message-banner success">{message}</div>}
      {error && <div className="message-banner error">{error}</div>}
      {renderContent()}
    </div>
  );
};

export default DashboardPage;