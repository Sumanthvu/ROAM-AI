import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMySavedTrips, deleteTrip } from '../api/tripApi';
import { updateUserCoverImage } from '../api/userApi';
import LoadingSpinner from '../components/LoadingSpinner';
import ProfileImageModal from '../components/ProfileImageModal';
import ConfirmationModal from '../components/ConfirmationModal';
import DotGrid from '../components/DotGrid';
import { PinContainer } from '../components/PinEffect';
import SavedTripPinCard from '../components/SavedTripPinCard';
import ItineraryDetailModal from '../components/ItineraryDetailModal';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);
  
  const [isItineraryModalOpen, setIsItineraryModalOpen] = useState(false);
  const [selectedTripForModal, setSelectedTripForModal] = useState(null);

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

  const openDeleteConfirmation = (tripId) => { 
    setTripToDelete(tripId); 
    setIsConfirmModalOpen(true); 
  };
  
  const handleConfirmDelete = async () => { 
    if (!tripToDelete) return; 
    try { 
      await deleteTrip(tripToDelete); 
      setTrips(trips.filter(trip => trip._id !== tripToDelete)); 
      setMessage("Trip successfully deleted."); 
    } catch (err) { 
      setError('Failed to delete the trip. Please try again.'); 
    } finally { 
      setIsConfirmModalOpen(false); 
      setTripToDelete(null); 
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
      setIsAvatarModalOpen(false); 
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
      setIsAvatarModalOpen(false); 
    } 
  };

  const handleShowItinerary = (e, trip) => {
    e.preventDefault();
    setSelectedTripForModal(trip);
    setIsItineraryModalOpen(true);
  };

  const handleCloseItinerary = () => {
    setIsItineraryModalOpen(false);
    setSelectedTripForModal(null);
  };

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="profile-page-container">
      {loading && <LoadingSpinner />}
      {isAvatarModalOpen && ( <ProfileImageModal user={user} onClose={() => setIsAvatarModalOpen(false)} onImageChange={handleImageChange} onImageRemove={handleImageRemove} /> )}
      <ConfirmationModal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} onConfirm={handleConfirmDelete} title="Confirm Trip Deletion" message="Are you sure you want to permanently delete this trip itinerary? This action cannot be undone." />
      
      {isItineraryModalOpen && (
        <ItineraryDetailModal trip={selectedTripForModal} onClose={handleCloseItinerary} />
      )}

      <div className="profile-header">
        <DotGrid
          dotSize={4}
          gap={12}
          baseColor="#1e293b" 
          activeColor="#5227FF" 
          proximity={120}
          shockRadius={500}
          shockStrength={10}
          resistance={750}
          returnDuration={1.5}
        />
        <div className="profile-avatar-wrapper" onClick={() => setIsAvatarModalOpen(true)}>
          <img 
            src={user.coverImage || `data:image/jpeg;base64,...`} 
            alt={user.userName} 
            className="profile-avatar" 
          />
          <div className="avatar-overlay">Click to change</div>
        </div>
        <div className="profile-info">
          <h1 className="profile-username">{user.userName}</h1>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>

      <div className="saved-trips-section">
        <h2 className="section-title">My Saved Itineraries</h2>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && trips.length === 0 ? (
          <p className="no-trips-message">You haven't saved any trips yet.</p>
        ) : (
          <div className="saved-trips-grid">
            {trips.map((trip) => (
              <div key={trip._id} onClick={(e) => handleShowItinerary(e, trip)}>
                <PinContainer title="Show Itinerary" href="#">
                  <SavedTripPinCard 
                    trip={trip} 
                    onDelete={openDeleteConfirmation}
                  />
                </PinContainer>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;