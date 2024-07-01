import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './PagesList.css';
import { setPage } from '../../../slices/pageDataSlice';

const PagesList = ({ onPageClick }) => {
  const pages = useSelector((state) => state.parsedData.pages);
  const reportCard = useSelector((state) => state.pageData.reportCard);
  const dispatch = useDispatch();
  const selectedFile = useSelector((state) => state.file.selectedFile);

  const handlePageClick = (page) => {
    if (window.clearScene) {
      window.clearScene();
    }
    dispatch(setPage(page));
    if (onPageClick) onPageClick(page);
  };

  const handleDownloadReportCard = () => {
    if (reportCard) {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportCard, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "report_card.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
  };

  return (
    <div className="pages-list-section">
      <div className="pages-header">
        <h3>{selectedFile ? selectedFile.name : 'No file loaded'}</h3>
        {reportCard && (
          <button className="download-report-card-btn" onClick={handleDownloadReportCard}>
            Download report
          </button>
        )}
      </div>
      {selectedFile && pages[selectedFile.name] ? (
        <ul>
          {pages[selectedFile.name].map((page, index) => (
            <li key={index} onClick={() => handlePageClick(page)}>
              <div>Page {index + 1}</div>
              <div>Dimensions mistakes: {page.metadata?.dimension_mistakes_count ?? 'N/A'}</div>
              <div>Other mistakes: {page.metadata?.other_mistakes_count ?? 'N/A'}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pages available</p>
      )}
    </div>
  );
};

export default PagesList;