import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import './DXFView.css';
import ThreeJSCanvas from './ThreeJSCanvas';
import CursorCoordinates from './CursorCoordinates';
import ViewToggle from './ViewToggle';

const DXFView = () => {
  const parsedData = useSelector((state) => state.parsedData);
  const canvasRef = useRef();
  const [views, setViews] = useState([]);

  const toggleView = (index) => {
    setViews(prevViews => {
      const newViews = [...prevViews];
      newViews[index].visible = !newViews[index].visible;
      newViews[index].contours.lines.forEach(line => line.visible = newViews[index].visible);
      newViews[index].contours.circles.forEach(circle => circle.visible = newViews[index].visible);
      newViews[index].contours.arcs.forEach(arc => arc.visible = newViews[index].visible);
      return newViews;
    });
  };

  return (
    <div className="dxf-view">
      {parsedData && <ThreeJSCanvas canvasRef={canvasRef} jsonData={parsedData} setViews={setViews} />}
      <CursorCoordinates className="cursor-coordinates" />
      <ViewToggle views={views} toggleView={toggleView} />
    </div>
  );
};

export default DXFView;