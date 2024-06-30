import React from 'react';
import './Header.css';

const Header = () => (
  <header className="header">
    <nav className="nav">
      <ul>
        <li><a href="#viewer">Viewer</a></li>
        <li><a href="#files">Files</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </nav>
  </header>
);

export default Header;