import React from 'react';
import { useSelector } from 'react-redux';
import './StatusSection.css';

const StatusSection = () => {
  const selectedPage = useSelector((state) => state.pageData.selectedPage);
  const selectedFile = useSelector((state) => state.file.selectedFile);

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(selectedPage, null, 2));
    const downloadAnchorNode = document.createElement('a');
    const filename = selectedPage?.metadata?.filename?.replace('.dxf', '.json') || 'data.json';
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", filename);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="status-section">
      <div className="status-header">
        <h3>{selectedFile ? `Data for: ${selectedFile.name}` : 'No file loaded'}</h3>
        {selectedPage && <button className="download-btn" onClick={handleDownload}>Download JSON</button>}
      </div>
      <div className="status-content">
        <div className="json-container">
          <pre>{selectedPage ? JSON.stringify(selectedPage, null, 2) : 'Select a page to view its data'}</pre>
        </div>
      </div>
    </div>
  );
};

export default StatusSection;