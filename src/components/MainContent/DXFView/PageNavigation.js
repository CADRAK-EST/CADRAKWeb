import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../../../slices/pageDataSlice';
import './PageNavigation.css';

const PageNavigation = () => {
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.parsedData.pages);
  const selectedFile = useSelector((state) => state.file.selectedFile);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (selectedFile && pages[selectedFile.name]) {
      setPageNumber(1);
      if (window.clearScene) {
        window.clearScene();
      }
      dispatch(setPage(pages[selectedFile.name][0]));
    }
  }, [selectedFile, pages, dispatch]);

  const handlePageChange = (event) => {
    const newPageNumber = parseInt(event.target.value, 10);
    if (selectedFile && pages[selectedFile.name] && newPageNumber > 0 && newPageNumber <= pages[selectedFile.name].length) {
      setPageNumber(newPageNumber);
      if (window.clearScene) {
        window.clearScene();
      }
      dispatch(setPage(pages[selectedFile.name][newPageNumber - 1]));
    }
  };

  const handleNextPage = () => {
    if (selectedFile && pages[selectedFile.name] && pageNumber < pages[selectedFile.name].length) {
      setPageNumber(pageNumber + 1);
      if (window.clearScene) {
        window.clearScene();
      }
      dispatch(setPage(pages[selectedFile.name][pageNumber]));
    }
  };

  const handlePreviousPage = () => {
    if (selectedFile && pages[selectedFile.name] && pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      if (window.clearScene) {
        window.clearScene();
      }
      dispatch(setPage(pages[selectedFile.name][pageNumber - 2]));
    }
  };

  if (!selectedFile || !pages[selectedFile.name]) {
    return null; // or return a placeholder UI
  }

  return (
    <div className="page-navigation">
      <button className="nav-button" onClick={handlePreviousPage} disabled={pageNumber <= 1}>
        &larr;
      </button>
      <input
        type="number"
        value={pageNumber}
        onChange={handlePageChange}
        min="1"
        max={pages[selectedFile.name].length}
      />
      <span> / {pages[selectedFile.name].length}</span>
      <button className="nav-button" onClick={handleNextPage} disabled={pageNumber >= pages[selectedFile.name].length}>
        &rarr;
      </button>
    </div>
  );
};

export default PageNavigation;