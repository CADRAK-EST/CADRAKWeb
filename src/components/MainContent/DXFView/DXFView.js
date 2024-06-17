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
    console.log('DXFView component rendered');
    if (parsedData && parsedData.views && views.length === 0) {
      const initializedViews = parsedData.views.map(view => ({ ...view, visible: true }));
      setViews(initializedViews);
      console.log('Initialized views:', initializedViews);
    }
  }, [parsedData, views.length]);

  const handleToggleView = (index) => {
    dispatch(toggleView(index));
    setViews((prevViews) =>
        prevViews.map((view, i) => (i === index ? { ...view, visible: !view.visible } : view))
    );
    console.log('Toggled view at index:', index);
  };

  return (
      <div className="dxf-view">
        {parsedData && <ThreeJSCanvas canvasRef={canvasRef} views={views} />}
        <CursorCoordinates className="cursor-coordinates" />
        <ViewToggle views={views} toggleView={handleToggleView} />
      </div>
  );
};

export default DXFView;
