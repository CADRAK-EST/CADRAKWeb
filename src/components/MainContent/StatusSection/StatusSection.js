import React from 'react';
import './StatusSection.css';

const StatusSection = ({ selectedFile }) => (
  <div className="status-section">
    <p>Status: {selectedFile ? `Loaded ${selectedFile.name}` : 'No file loaded'}</p>
  </div>
);

export default StatusSection;