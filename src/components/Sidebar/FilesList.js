import React, { useRef } from 'react';
import './FilesList.css';

const FilesList = ({ files, onFileClick, onFolderSelect }) => {
  const folderInputRef = useRef(null);

  const handleFolderChange = (event) => {
    console.log(event.target.files); // Log all files received
    const folderFiles = Array.from(event.target.files).filter(file => file.name.endsWith('.dxf'));
    onFolderSelect(folderFiles);
  };

  return (
    <div className="files-list">
      <h2>Files</h2>
      {files.length === 0 ? (
        <p className="no-files">No files uploaded</p>
      ) : (
        <ul>
          {files.map((file, index) => (
            <li key={index} className="file-item" onClick={() => onFileClick(file)}>
              {file.name}
            </li>
          ))}
        </ul>
      )}
      <input
        type="file"
        webkitdirectory="true"
        directory="true"
        style={{ display: 'none' }}
        onChange={handleFolderChange}
        ref={folderInputRef}
      />
      <button className="select-folder-btn" onClick={() => folderInputRef.current.click()}>
        Select a Folder
      </button>
    </div>
  );
};

export default FilesList;
