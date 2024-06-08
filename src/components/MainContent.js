import React from 'react';
import './MainContent.css';
import DXFView from './DXFView';
import StatusSection from './StatusSection';

const MainContent = ({ selectedFile }) => (
  <div className="main-content">
    <DXFView selectedFile={selectedFile} />
    <StatusSection selectedFile={selectedFile} />
  </div>
);

export default MainContent;