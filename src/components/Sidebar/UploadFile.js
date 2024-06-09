import React, { useState } from 'react';
import './UploadFile.css';

const UploadFile = ({ onFileUpload }) => {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);

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

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
      .filter(file => file.name.endsWith('.dxf'));

    setFiles(selectedFiles);
  };

  const handleUpload = () => {
    const uploadedFiles = [];

    files.forEach(file => {
      const formData = new FormData();
      formData.append('file', file);

      fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          if (data.file_path) {
            uploadedFiles.push({ name: file.name, path: data.file_path });
            if (uploadedFiles.length === files.length) {
              onFileUpload(uploadedFiles);
            }
          }
        })
        .catch(error => console.error('Error uploading file:', error));
    });

    setFiles([]);
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
