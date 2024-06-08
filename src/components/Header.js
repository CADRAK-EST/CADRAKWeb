import React from 'react';
import './Header.css';

const Header = () => (
  <header className="header">
    <img src={`${process.env.PUBLIC_URL}/CADRAK Logo.png`} alt="CADRAK Logo" className="logo" />
    <h1>DXF Checker</h1>
  </header>
);

export default Header;