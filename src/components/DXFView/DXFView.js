import React, { useState } from 'react';
import DXFRender from './DXFRender';
import CursorCoordinates from './CursorCoordinates';
import './DXFView.css';

const DXFView = ({ fakeData }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleCursorMove = (x, y) => {
    setCursorPosition({ x, y });
  };

  return (
    <div className="dxf-view">
      <DXFRender fakeData={fakeData} onCursorMove={handleCursorMove} />
      <CursorCoordinates x={cursorPosition.x} y={cursorPosition.y} />
    </div>
  );
};

export default DXFView;