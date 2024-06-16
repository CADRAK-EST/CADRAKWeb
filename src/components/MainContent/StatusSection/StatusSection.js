import React from 'react';
import { useSelector } from 'react-redux';
import './StatusSection.css';

const StatusSection = () => {
  const parsedData = useSelector((state) => state.parsedData);

  const filename = parsedData && parsedData.metadata ? parsedData.metadata.filename : null;

  return (
      <div className="status-section">
          <h3>{filename ? `Data for: ${filename}` : 'No file loaded'}</h3>
          <div className="json-container">
              <pre>{parsedData ? JSON.stringify(parsedData, null, 2) : 'No data available'}</pre>
          </div>
      </div>
  );
};

export default StatusSection;