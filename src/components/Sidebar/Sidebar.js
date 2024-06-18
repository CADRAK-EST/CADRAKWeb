import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFiles } from '../../slices/fileSlice';
import './Sidebar.css';
import FilesList from './FilesList';
import UploadFile from './UploadFile';

const Sidebar = ({ onFileClick }) => {
  const files = useSelector((state) => state.file.files);
  const dispatch = useDispatch();

  const handleFileUpload = (newFiles) => {
    dispatch(setFiles([...files, ...newFiles]));
  };

  return (
    <div className="sidebar">
      <FilesList files={files} onFileClick={onFileClick} />
      <UploadFile onFileUpload={handleFileUpload} />
    </div>
  );
};

export default Sidebar;
