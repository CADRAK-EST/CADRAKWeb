import React, { useState } from 'react';
import './UploadFile.css';

const UploadFile = ({ onFileUpload }) => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith('.dxf')) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.dxf')) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      onFileUpload(file);
      setFile(null);
    }
  };

  return (
    <div className="upload-file">
      <h2>Upload a DXF</h2>
      <div
        className={`drag-drop-area ${dragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p>{file ? file.name : 'Drag & Drop your file here'}</p>
      </div>
      <input type="file" accept=".dxf" onChange={handleFileChange} />
      <button
        type="button"
        onClick={handleUpload}
        disabled={!file}
        className={file ? 'active' : 'inactive'}
      >
        Upload
      </button>
    </div>
  );
};

export default UploadFile;
