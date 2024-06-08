import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Header from './components/Header';

const fakeData = {
  lines: [
    
  ],
  circles: [
    { center: { x: 0, y: 0 }, radius: 2 }
  ],
  arcs: [
    
  ],
};

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
        <MainContent selectedFile={selectedFile} fakeData={fakeData} />
      </div>
    </div>
  );
};

export default App;