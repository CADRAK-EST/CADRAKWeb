import React from 'react';
import { useSelector } from 'react-redux';
import './DXFView.css';

const DXFView = () => {
  const parsedData = useSelector((state) => state.parsedData);

  return (
    <div className="dxf-view">
      {parsedData ? <p className="dxf-view-text">{`Filename loaded: ${parsedData.filename}`}</p> : <p className="dxf-view-text">No file loaded</p>}
    </div>
  );
};

export default DXFView;