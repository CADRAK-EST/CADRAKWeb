import React from 'react';
import { useSelector } from 'react-redux';
import './StatusSection.css';

const StatusSection = () => {
  const parsedData = useSelector((state) => state.parsedData);

  return (
    <div className="status-section">
      <h3>{parsedData ? `Data for: ${parsedData.metadata.filename}` : 'No file loaded'}</h3>
      <div className="json-container">
        <pre>{parsedData ? JSON.stringify(parsedData, null, 2) : 'No data available'}</pre>
      </div>
    </div>
  );
};

export default StatusSection;