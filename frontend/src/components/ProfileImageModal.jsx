// src/components/ProfileImageModal.jsx

import React, { useRef } from 'react';
import './ProfileImageModal.css';

const ProfileImageModal = ({ user, onClose, onImageChange, onImageRemove }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageChange(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>×</button>
        <img 
            src={user.coverImage || `https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg`} 
            alt={user.userName} 
            className="modal-image-preview" 
        />
        <div className="modal-actions">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
          <button onClick={triggerFileSelect} className="modal-button change">Change Image</button>
          <button onClick={onImageRemove} className="modal-button remove">Remove Image</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageModal;