import React, { useEffect } from 'react';
import './MainContent.css';
import StatusSection from './MainContent/StatusSection';
import DXFView from './MainContent/DXFView';
import useParsedData from '../Data';

const MainContent = ({ selectedFile }) => {
  const [parsedData, fetchParsedData] = useParsedData();

  useEffect(() => {
    if (selectedFile) {
      fetchParsedData(selectedFile.path);
    }
  }, [selectedFile, fetchParsedData]);

  return (
    <div className="main-content">
      <DXFView parsedData={parsedData} />
      <StatusSection selectedFile={selectedFile} />
    </div>
  );
};

export default MainContent;
