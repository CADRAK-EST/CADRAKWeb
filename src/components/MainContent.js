import React from 'react';
import './MainContent.css';
import DXFView from './MainContent/DXFView';
import StatusSection from './MainContent/StatusSection';

const fakeData = {
  lines: [
    // Add line data here
  ],
  circles: [
    { center: { x: 0, y: 0 }, radius: 50, style: { color: '#0000ff', width: 2 } },
  ],
  arcs: [
    // Add arc data here
  ],
};

const MainContent = ({ selectedFile }) => (
  <div className="main-content">
    <DXFView selectedFile={selectedFile} fakeData={fakeData} />
    <StatusSection selectedFile={selectedFile} />
  </div>
);

export default MainContent;
