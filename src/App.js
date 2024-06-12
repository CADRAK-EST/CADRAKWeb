import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedFile } from './slices/fileSlice';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import Header from './components/Header/Header';

const App = () => {
  const dispatch = useDispatch();

  const handleFileClick = (file) => {
    dispatch(setSelectedFile(file));
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