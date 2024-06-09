import React from 'react';
import './CursorCoordinates.css';

const CursorCoordinates = ({ x, y }) => {
  return (
    <div className="cursor-coordinates">
      X: {x.toFixed(2)}, Y: {y.toFixed(2)}
    </div>
  );
};

export default CursorCoordinates;
