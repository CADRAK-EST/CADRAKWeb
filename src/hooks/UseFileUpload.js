import { useState } from 'react';
import { uploadFile } from '../api/APICalls';

const useFileUpload = (onFileUpload) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = async (e) => {
    const filesSource = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    const selectedFiles = Array.from(filesSource)
      .filter(file => file.name.endsWith('.dxf') || file.name.endsWith('.zip'));

    const uploadedFiles = [];
    for (const file of selectedFiles) {
      try {
        const data = await uploadFile(file);
        if (data.file_path) {
          uploadedFiles.push({ name: file.name, path: data.file_path });
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    if (uploadedFiles.length > 0) {
      const allFiles = [...files, ...uploadedFiles];
      console.log('All files after upload:', allFiles);
      setFiles(allFiles);
      onFileUpload(allFiles);
    }
  };

  return { files, setFiles, handleFileChange };
};

export default useFileUpload;