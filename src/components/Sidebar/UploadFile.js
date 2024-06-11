import React, { useState } from 'react';
import { useFileUpload } from '../../hooks/useFileUpload';
import './UploadFile.css';

const UploadFile = ({ onFileUpload, setFiles }) => { // Use setFiles prop
  const [dragging, setDragging] = useState(false);
  const { files, handleFileChange, handleUpload } = useFileUpload(onFileUpload);

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
    const droppedFiles = Array.from(e.dataTransfer.files)
      .filter(file => file.name.endsWith('.dxf'));
    setFiles(droppedFiles);
  };

  return (
    <div className="upload-file">
      <h2>Upload DXF Files</h2>
      <div
        className={`drag-drop-area ${dragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p>{files.length > 0 ? `${files.length} files selected` : 'Drag & Drop your files here'}</p>
      </div>
      <input type="file" accept=".dxf" multiple onChange={handleFileChange} />
      <button
        type="button"
        onClick={handleUpload}
        disabled={files.length === 0}
        className={files.length > 0 ? 'active' : 'inactive'}
      >
        Upload
      </button>
    </div>
  );
};

export default UploadFile;
