import React, { useState } from 'react';
import useFileUpload from '../../hooks/UseFileUpload'; 
import { useDispatch } from 'react-redux';
import { setFiles } from '../../slices/fileSlice';
import './UploadFile.css';

const UploadFile = () => {
  const [dragging, setDragging] = useState(false);
  const dispatch = useDispatch();
  const { files, handleFileChange, handleUpload } = useFileUpload((uploadedFiles) => {
    console.log('Files uploaded:', uploadedFiles);
    dispatch(setFiles(uploadedFiles));
  });

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
    handleFileChange(e);
  };

  return (
    <div className="upload-file">
      <h2>Upload DXF or Zip Files</h2>
      <div
        className={`drag-drop-area ${dragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p>{files.length > 0 ? `Upload ${files.length} files` : "Drag & Drop your files here or click to upload"}</p>
      </div>
      <input type="file" accept=".dxf,.zip" multiple onChange={handleFileChange} style={{ display: 'none' }} />
      <button
        type="button"
        onClick={handleUpload}
        className={`upload-btn ${dragging ? 'active' : 'inactive'}`}
      >
        Upload Files
      </button>
    </div>
  );
};

export default UploadFile;