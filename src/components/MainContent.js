import React from 'react';
import './MainContent.css';
import DXFView from './DXFView/DXFView';
import StatusSection from './StatusSection';

const fakeData = {
  lines: [
    
  ],
  circles: [
    { center: { x: 0, y: 0 }, radius: 50, style: { color: '#0000ff', width: 2 } },
  ],
  arcs: [
    
  ],
};

const MainContent = ({ selectedFile }) => (
  <div className="main-content">
    <DXFView selectedFile={selectedFile} fakeData={fakeData} />
    <StatusSection selectedFile={selectedFile} />
  </div>
);

export default MainContent;
