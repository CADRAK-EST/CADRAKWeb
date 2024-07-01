import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import FilesPage from './components/FilesPage/FilesPage';
import AboutPage from './components/AboutPage/AboutPage';
import Overlay from './components/Overlay/Overlay';

const App = () => {
  const [isFilesOverlayVisible, setFilesOverlayVisible] = useState(false);
  const [isAboutOverlayVisible, setAboutOverlayVisible] = useState(false);

  const handleFilesClick = () => setFilesOverlayVisible(true);
  const handleAboutClick = () => setAboutOverlayVisible(true);
  const handleCloseOverlay = () => {
    setFilesOverlayVisible(false);
    setAboutOverlayVisible(false);
  };

  return (
    <div className="app">
      <Header onFilesClick={handleFilesClick} onAboutClick={handleAboutClick} />
      <MainContent />
      <Overlay isVisible={isFilesOverlayVisible} onClose={handleCloseOverlay}>
        <FilesPage />
      </Overlay>
      <Overlay isVisible={isAboutOverlayVisible} onClose={handleCloseOverlay}>
        <AboutPage />
      </Overlay>
    </div>
  );
};

export default App;