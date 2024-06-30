import React from 'react';
import './InformationSection.css';
import JSONSection from './JSONSection';
import PagesList from './PagesList';
import UploadFile from './UploadFile';

const InformationSection = ({ onFileUpload }) => {
  return (
    <div className="information-section">
      <UploadFile />
      <PagesList onPageClick={onFileUpload} />
      <JSONSection />
    </div>
  );
};

export default InformationSection;