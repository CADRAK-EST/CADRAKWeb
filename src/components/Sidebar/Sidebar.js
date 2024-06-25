import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFiles } from '../../slices/fileSlice';
import './Sidebar.css';
import FilesList from './FilesList';
import UploadFile from './UploadFile';
import PagesList from './PagesList';

const Sidebar = ({ onFileClick }) => {
  const files = useSelector((state) => state.file.files);
  const dispatch = useDispatch();

  const handleFileUpload = (newFiles) => {
    dispatch(setFiles(newFiles));
  };

  return (
    <div className="sidebar">
      <FilesList files={files} onFileClick={onFileClick} />
      <UploadFile onFileUpload={handleFileUpload} />
      <PagesList />
    </div>
  );
};

export default Sidebar;