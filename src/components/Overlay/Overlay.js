import React from 'react';
import './Overlay.css';

const Overlay = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="overlay">
      <div className="overlay-content">
        <button className="overlay-close" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Overlay;