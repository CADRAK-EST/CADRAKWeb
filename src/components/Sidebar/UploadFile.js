import React from 'react';
import useFileUpload from '../../hooks/UseFileUpload'; 
import { useDispatch } from 'react-redux';
import { setFiles } from '../../slices/fileSlice';
import './UploadFile.css';

const UploadFile = () => {
  const dispatch = useDispatch();
  const { handleFileChange } = useFileUpload((uploadedFiles) => {
    console.log('Files uploaded:', uploadedFiles);
    dispatch(setFiles(uploadedFiles));
  });

  return (
    <div className="upload-file">
      <input
        type="file"
        accept=".dxf,.zip"
        multiple
        onChange={handleFileChange}
        id="file-input"
        style={{ display: 'none' }}
      />
      <label htmlFor="file-input" className="upload-btn">
        Upload Files
      </label>
    </div>
  );
};

export default UploadFile;