import React, { useState } from 'react';
import './Sidebar.css';
import FilesList from './FilesList';
import UploadFile from './UploadFile';
import useParsedData from '../../Data';

const Sidebar = ({ onFileClick }) => {
  const [files, setFiles] = useState([]);
  const [, fetchParsedData] = useParsedData();

  const handleFileUpload = (newFiles) => {
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleFileClick = (file) => {
    fetchParsedData(file.path);
    onFileClick(file);
  };

  return (
    <div className="sidebar">
      <FilesList files={files} onFileClick={handleFileClick} />
      <UploadFile onFileUpload={handleFileUpload} setFiles={setFiles} />
    </div>
  );
};

export default Sidebar;
