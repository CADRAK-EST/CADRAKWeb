import { useState } from 'react';
import { uploadFile } from '../api';

const useFileUpload = (onFileUpload) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
      .filter(file => file.name.endsWith('.dxf'));
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    const uploadedFiles = [];

    for (const file of files) {
      try {
        const data = await uploadFile(file);
        if (data.file_path) {
          uploadedFiles.push({ name: file.name, path: data.file_path });
          if (uploadedFiles.length === files.length) {
            onFileUpload(uploadedFiles);
          }
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    setFiles([]);
  };

  return { files, setFiles, handleFileChange, handleUpload };
};

export default useFileUpload;
