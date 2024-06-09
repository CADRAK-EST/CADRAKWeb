import React from 'react';
import './FilesList.css';

const FilesList = ({ files, onFileClick }) => {
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
    </div>
  );
};

export default FilesList;
