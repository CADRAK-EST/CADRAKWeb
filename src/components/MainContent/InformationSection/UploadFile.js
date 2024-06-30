import React from 'react';
import useFileUpload from '../../../hooks/UseFileUpload';
import { useDispatch } from 'react-redux';
import { setFiles, setSelectedFile } from '../../../slices/fileSlice';
import { clearParsedData, setParsedData } from '../../../slices/parsedDataSlice';
import { clearPage } from '../../../slices/pageDataSlice';
import './UploadFile.css';
import useParsedData from '../../../hooks/UseParsedData';

const UploadFile = () => {
  const dispatch = useDispatch();
  const fetchParsedData = useParsedData();
  
  const { handleFileChange } = useFileUpload((uploadedFiles) => {
    console.log('Files uploaded:', uploadedFiles);
    dispatch(setFiles(uploadedFiles));

    if (uploadedFiles.length > 0) {
      const file = uploadedFiles[uploadedFiles.length - 1];
      dispatch(setSelectedFile(file));
      dispatch(clearParsedData());
      dispatch(clearPage());

      // Fetch parsed data
      fetchParsedData(file.path, (pageData) => {
        console.log('Dispatching parsed page data:', pageData);
        dispatch(setParsedData({ fileName: file.name, pageData }));
      });
    }
  });

  return (
    <div className="upload-file">
      <input
        type="file"
        accept=".dxf,.zip"
        multiple
        onChange={handleFileChange}
        id="file-input"
        style={{ display: 'none' }}
      />
      <label htmlFor="file-input" className="upload-btn">
        Upload Files
      </label>
    </div>
  );
};

export default UploadFile;