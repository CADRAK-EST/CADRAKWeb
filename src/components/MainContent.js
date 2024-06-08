import React from 'react';
import './MainContent.css';
import DXFView from './DXFView/DXFView';
import StatusSection from './StatusSection';

const MainContent = ({ selectedFile, fakeData }) => (
  <div className="main-content">
    <DXFView selectedFile={selectedFile} fakeData={fakeData} />
    <StatusSection selectedFile={selectedFile} />
  </div>
);

export default MainContent;