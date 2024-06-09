import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Header from './components/Header';
import './App.css';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  return (
    <div className="App">
      <Header />
      <div className="content">
        <Sidebar onFileClick={handleFileClick} />
        <MainContent selectedFile={selectedFile} />
      </div>
    </div>
  );
};

export default App;
