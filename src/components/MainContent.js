import React from 'react';
import './MainContent.css';
import DXFView from './MainContent/DXFView';
import StatusSection from './MainContent/StatusSection';

const fakeData = {
  lines: [
    
  ],
  circles: [
    
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
