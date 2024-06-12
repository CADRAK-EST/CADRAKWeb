import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './MainContent.css';
import StatusSection from './StatusSection/StatusSection';
import DXFView from './DXFView/DXFView';
import useParsedData from '../../hooks/UseParsedData';
import { setParsedData, clearParsedData } from '../../slices/parsedDataSlice';

const MainContent = () => {
  const selectedFile = useSelector((state) => state.file.selectedFile);
  const dispatch = useDispatch();
  const fetchParsedData = useParsedData();

  useEffect(() => {
    if (selectedFile) {
      fetchParsedData(selectedFile.path).then((data) => {
        dispatch(setParsedData(data));
      });
    } else {
      dispatch(clearParsedData());
    }
  }, [selectedFile, fetchParsedData, dispatch]);

  return (
    <div className="main-content">
      <DXFView />
      <StatusSection />
    </div>
  );
};

export default MainContent;