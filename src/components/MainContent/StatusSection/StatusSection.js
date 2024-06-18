import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './StatusSection.css';
import { setPage } from '../../../slices/pageDataSlice';

const StatusSection = () => {
  const pages = useSelector((state) => state.parsedData.pages);
  const dispatch = useDispatch();
  const selectedPage = useSelector((state) => state.pageData.selectedPage);
  const selectedFile = useSelector((state) => state.file.selectedFile);

  const handlePageClick = (page) => {
    dispatch(setPage(page));
  };

  return (
    <div className="status-section">
      <h3>{selectedFile ? `Data for: ${selectedFile.name}` : 'No file loaded'}</h3>
      <div className="status-content">
        <div className="json-list">
          {selectedFile && pages[selectedFile.name] && pages[selectedFile.name].map((page, index) => (
            <div key={index} className="json-list-item" onClick={() => handlePageClick(page)}>
              Page {index + 1}
            </div>
          ))}
        </div>
        <div className="json-container">
          <pre>{selectedPage ? JSON.stringify(selectedPage, null, 2) : 'Select a page to view its data'}</pre>
        </div>
      </div>
    </div>
  );
};

export default StatusSection;
