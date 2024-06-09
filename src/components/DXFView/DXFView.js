import React, { useState, useCallback } from 'react';
import DXFRender from './DXFRender';
import CursorCoordinates from './CursorCoordinates';
import './DXFView.css';

const DXFView = ({ selectedFile, fakeData }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleCursorMove = useCallback((x, y) => {
    setCursorPosition({ x, y });
  }, []);

  return (
    <div className="dxf-view">
      <DXFRender selectedFile={selectedFile} onCursorMove={handleCursorMove} fakeData={fakeData} />
      <CursorCoordinates x={cursorPosition.x} y={cursorPosition.y} />
    </div>
  );
};

export default DXFView;
