import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './PagesList.css';
import { setPage } from '../../slices/pageDataSlice';

const PagesList = () => {
  const pages = useSelector((state) => state.parsedData.pages);
  const dispatch = useDispatch();
  const selectedFile = useSelector((state) => state.file.selectedFile);

  const handlePageClick = (page) => {
    dispatch(setPage(page));
  };

  return (
    <div className="pages-list">
      <h2>Pages</h2>
      {selectedFile && pages[selectedFile.name] ? (
        <ul>
          {pages[selectedFile.name].map((page, index) => (
            <li key={index} onClick={() => handlePageClick(page)}>
              Page {index + 1}
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