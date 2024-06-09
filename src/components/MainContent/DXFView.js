import React, { useState, useCallback } from 'react';
import DXFRender from './DXFView/DXFRender';
import CursorCoordinates from './DXFView/CursorCoordinates';
import './DXFView.css';

const DXFView = ({ parsedData }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleCursorMove = useCallback((x, y) => {
    setCursorPosition({ x, y });
  }, []);

  return (
    <div className="dxf-view">
      <DXFRender onCursorMove={handleCursorMove} parsedData={parsedData} />
      <CursorCoordinates x={cursorPosition.x} y={cursorPosition.y} />
    </div>
  );
};

export default DXFView;
