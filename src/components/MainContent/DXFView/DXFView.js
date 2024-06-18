import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './DXFView.css';
import ThreeJSCanvas from './ThreeJSCanvas';
import CursorCoordinates from './CursorCoordinates';
import ViewToggle from './ViewToggle';
import { toggleView } from '../../../slices/pageDataSlice';

const DXFView = () => {
  const pageState = useSelector((state) => state.pageData);
  const canvasRef = useRef();
  const dispatch = useDispatch();
  const [views, setViews] = useState([]);

  useEffect(() => {
    console.log('DXFView component rendered');
    if (pageState && pageState.views && views.length === 0) {
      const initializedViews = pageState.views.map(view => ({ ...view, visible: true }));
      setViews(initializedViews);
    }
  }, [pageState, views.length]);

  const handleToggleView = (index) => {
    dispatch(toggleView(index));
    setViews((prevViews) =>
        prevViews.map((view, i) => (i === index ? { ...view, visible: !view.visible } : view))
    );
  };

  return (
      <div className="dxf-view">
        <ThreeJSCanvas canvasRef={canvasRef} views={views} />
        <CursorCoordinates className="cursor-coordinates" />
        <ViewToggle views={views} toggleView={handleToggleView} />
      </div>
  );
};

export default DXFView;
