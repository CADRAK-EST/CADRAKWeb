import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './DXFView.css';
import ThreeJSCanvas from './ThreeJSCanvas';
import CursorCoordinates from './CursorCoordinates';
import ViewToggle from './ViewToggle';
import { toggleView } from '../../../slices/parsedDataSlice';

const DXFView = () => {
  const parsedData = useSelector((state) => state.parsedData);
  const canvasRef = useRef();
  const dispatch = useDispatch();
  const [views, setViews] = useState([]);

  const handleToggleView = (index) => {
    dispatch(toggleView(index));
  };

  return (
    <div className="dxf-view">
      {parsedData && <ThreeJSCanvas canvasRef={canvasRef} jsonData={parsedData} setViews={setViews} />}
      <CursorCoordinates className="cursor-coordinates" />
      <ViewToggle views={views} toggleView={handleToggleView} />
    </div>
  );
};

export default DXFView;