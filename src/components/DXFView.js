import React from 'react';
import './DXFView.css';

const DXFView = ({ selectedFile }) => (
  <div className="drawing-area">
    {selectedFile ? (
      <p>Loading {selectedFile.name}...</p>
    ) : (
      <p>No DXF loaded</p>
    )}
  </div>
);

export default DXFView;