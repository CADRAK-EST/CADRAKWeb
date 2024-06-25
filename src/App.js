import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedFile } from './slices/fileSlice';
import { clearParsedData } from './slices/parsedDataSlice';
import { clearPage } from './slices/pageDataSlice';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import Header from './components/Header/Header';

const App = () => {
  const dispatch = useDispatch();

  const handleFileClick = (file) => {
    console.log('File clicked:', file);
    dispatch(setSelectedFile(file));
    dispatch(clearParsedData());
    dispatch(clearPage());
  };

  return (
    <div className="App">
      <Header />
      <div className="content">
        <Sidebar onFileClick={handleFileClick} />
        <MainContent />
      </div>
    </div>
  );
};

export default App;