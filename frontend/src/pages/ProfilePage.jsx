// src/pages/ProfilePage.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMySavedTrips, deleteTrip } from '../api/tripApi';
import { updateUserCoverImage } from '../api/userApi';
import LoadingSpinner from '../components/LoadingSpinner';
import SavedTripCard from '../components/SavedTripCard';
import ProfileImageModal from '../components/ProfileImageModal';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTrips = async () => {
      setError('');
      setLoading(true);
      try {
        const response = await getMySavedTrips();
        if (response.success) {
          setTrips(response.data);
        }
      } catch (err) {
        setError('Failed to load your saved trips.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleDelete = async (tripId) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        await deleteTrip(tripId);
        setTrips(trips.filter(trip => trip._id !== tripId));
      } catch (err) {
        setError('Failed to delete the trip. Please try again.');
      }
    }
  };

  const handleImageChange = async (file) => {
    const formData = new FormData();
    formData.append('coverImage', file);
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const response = await updateUserCoverImage(formData);
      if (response.success) {
        updateUser(response.data);
        setMessage('Profile image updated successfully!');
      }
    } catch (err) {
      setError(err.message || 'Failed to update image.');
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };
  
  const handleImageRemove = async () => {
    const formData = new FormData();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const response = await updateUserCoverImage(formData);
      if (response.success) {
        updateUser(response.data);
        setMessage('Profile image removed.');
      }
    } catch(err) {
        setError(err.message || 'Failed to remove image.');
    } finally {
        setLoading(false);
        setIsModalOpen(false);
    }
  };

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="profile-page-container">
      {loading && <LoadingSpinner />}
      {isModalOpen && (
        <ProfileImageModal 
          user={user} 
          onClose={() => setIsModalOpen(false)} 
          onImageChange={handleImageChange}
          onImageRemove={handleImageRemove}
        />
      )}

      <div className="profile-header">
        <div className="profile-avatar-wrapper" onClick={() => setIsModalOpen(true)}>
          <img 
            src={user.coverImage || `https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg`} 
            alt={user.userName} 
            className="profile-avatar" 
          />
          {/* <div className="avatar-overlay">Click to change</div> */}
        </div>
        <div className="profile-info">
          <h1 className="profile-username">{user.userName}</h1>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>

      <div className="saved-trips-section">
        <h2 className="section-title">My Saved Itineraries</h2>
        {message && <p className="success-message">{message}</p>}
        {loading && <p>Loading trips...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && trips.length === 0 ? (
          <p className="no-trips-message">You haven't saved any trips yet.</p>
        ) : (
          <div className="saved-trips-grid">
            {trips.map((trip) => (
              <SavedTripCard 
                key={trip._id} 
                trip={trip} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;