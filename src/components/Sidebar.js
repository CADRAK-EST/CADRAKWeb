import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import FilesList from './Sidebar/FilesList';
import UploadFile from './Sidebar/UploadFile';

const Sidebar = ({ onFileClick }) => {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (file) => {
    setFiles([...files, file]);
  };

  const handleFolderSelect = (folderFiles) => {
    // Create a new list that excludes files already in the state
    const newFiles = folderFiles.filter(newFile => 
      !files.some(existingFile => existingFile.name === newFile.name)
    );

    // Update the state with the new list (concatenated with existing files)
    setFiles([...files, ...newFiles]);
    console.log(files); // Log the updated files array to see if it's correct
  };

  useEffect(() => {
    console.log(files); // This will log the updated state
  }, [files]);

  return (
    <div className="sidebar">
      <FilesList files={files} onFileClick={onFileClick} onFolderSelect={handleFolderSelect} />
      <UploadFile onFileUpload={handleFileUpload} />
    </div>
  );
};

export default Sidebar;