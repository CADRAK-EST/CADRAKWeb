import React from 'react';
import { useSelector } from 'react-redux';
import './FilesPage.css';

const FilesPage = () => {
  const files = useSelector((state) => state.file.files);

  return (
    <div className="files-page">
      <h2>Uploaded Files</h2>
      {files.length > 0 ? (
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      ) : (
        <p>No files uploaded</p>
      )}
    </div>
  );
};

export default FilesPage;