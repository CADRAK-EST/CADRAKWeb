import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedFile } from '../../slices/fileSlice';
import { clearParsedData, setParsedData } from '../../slices/parsedDataSlice';
import { clearPage, setReportCard } from '../../slices/pageDataSlice';
import useParsedData from '../../hooks/UseParsedData';
import './FilesPage.css';

const FilesPage = () => {
  const files = useSelector((state) => state.file.files);
  const dispatch = useDispatch();
  const fetchParsedData = useParsedData();

  const handleFileClick = (file) => {
    dispatch(setSelectedFile(file));
    dispatch(clearParsedData());
    dispatch(clearPage());

    // Fetch parsed data
    fetchParsedData(file.path, (pageData) => {
      dispatch(setParsedData({ fileName: file.name, pageData }));
    }, (reportCard) => {
      dispatch(setReportCard(reportCard));
    });
  };

  return (
    <div className="files-page">
      <h2>Uploaded Files</h2>
      {files.length > 0 ? (
        <ul>
          {files.map((file, index) => (
            <li key={index} onClick={() => handleFileClick(file)}>{file.name}</li>
          ))}
        </ul>
      ) : (
        <p>No files uploaded</p>
      )}
    </div>
  );
};

export default FilesPage;