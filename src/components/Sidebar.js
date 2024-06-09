import React, { useState } from 'react';
import './Sidebar.css';
import FilesList from './Sidebar/FilesList';
import UploadFile from './Sidebar/UploadFile';

const Sidebar = ({ onFileClick }) => {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (newFiles) => {
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleFileClick = (file) => {
    fetch('http://localhost:5000/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ file_path: file.path }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        console.log('Parsed Data:', data.parsed_data);
      })
      .catch(error => console.error('Error logging file:', error));
      
    onFileClick(file);
  };

  return (
    <div className="sidebar">
      <FilesList files={files} onFileClick={handleFileClick} />
      <UploadFile onFileUpload={handleFileUpload} />
    </div>
  );
};

export default Sidebar;
