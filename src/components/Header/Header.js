import React from 'react';
import './Header.css';

const Header = ({ onFilesClick, onAboutClick }) => (
  <header className="header">
    <nav className="nav">
      <ul>
        <li><button onClick={onFilesClick}>Files</button></li>
        <li><button onClick={onAboutClick}>About</button></li>
      </ul>
    </nav>
  </header>
);

export default Header;