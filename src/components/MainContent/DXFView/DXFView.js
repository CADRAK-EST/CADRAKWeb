import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './DXFView.css';
import ThreeJSCanvas from './ThreeJSCanvas';
import CursorCoordinates from './CursorCoordinates';
import ViewToggle from './ViewToggle';
import { toggleView, setParsedData } from '../../../slices/parsedDataSlice';

const DXFView = () => {
  const parsedData = useSelector((state) => state.parsedData);
  const canvasRef = useRef();
  const dispatch = useDispatch();
  const [views, setViews] = useState([]);

  useEffect(() => {
    if (parsedData && parsedData.views) {
      setViews(parsedData.views);
    }
  }, [parsedData]);

  const handleToggleView = (index) => {
    dispatch(toggleView(index));
    setViews((prevViews) =>
        prevViews.map((view, i) => (i === index ? { ...view, visible: !view.visible } : view))
    );
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
