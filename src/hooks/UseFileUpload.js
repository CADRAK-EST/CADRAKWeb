import { useState } from 'react';
import { uploadFile } from '../api/APICalls';

const useFileUpload = (onFileUpload) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const filesSource = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    const selectedFiles = Array.from(filesSource)
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
