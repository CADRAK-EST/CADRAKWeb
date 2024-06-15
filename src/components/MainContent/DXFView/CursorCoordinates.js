import React from 'react';
import { useSelector } from 'react-redux';
import './DXFView.css';

const CursorCoordinates = () => {
    const cursorPosition = useSelector(state => state.cursorPosition);

    return (
        <div className="cursor-coordinates">
            Cursor coordinates: X: {cursorPosition.x?.toFixed(2)}, Y: {cursorPosition.y?.toFixed(2)}
        </div>
    );
};

export default CursorCoordinates;
