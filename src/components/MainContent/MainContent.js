import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './MainContent.css';
import StatusSection from './StatusSection/StatusSection';
import DXFView from './DXFView/DXFView';
import useParsedData from '../../hooks/UseParsedData';
import { setParsedData, clearParsedData } from '../../slices/parsedDataSlice';
import { clearPage } from '../../slices/pageDataSlice';

const MainContent = () => {
  const selectedFile = useSelector((state) => state.file.selectedFile);
  const dispatch = useDispatch();
  const fetchParsedData = useParsedData();

  useEffect(() => {
    if (selectedFile) {
      console.log('useEffect triggered', { selectedFile });
      dispatch(clearParsedData());
      dispatch(clearPage());

      if (!selectedFile.path) {
        console.error('Selected file does not have a valid path:', selectedFile);
        return;
      }

      fetchParsedData(selectedFile.path, (pageData) => {
        dispatch(setParsedData({ fileName: selectedFile.name, pageData }));
      });
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