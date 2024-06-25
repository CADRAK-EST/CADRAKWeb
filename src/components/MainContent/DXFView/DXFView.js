import React, { useRef } from 'react';
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

  const handleToggleView = (index) => {
    dispatch(toggleView(index));
  };

  return (
      <div className="dxf-view">
        <ThreeJSCanvas
            canvasRef={canvasRef}
            views={pageState.views ? pageState.views : []}
            visibility={pageState.visibility ? pageState.visibility : []}
            texts={pageState.texts || { texts: [], mtexts: [], attdefs: []}}
        />
        <CursorCoordinates className="cursor-coordinates" />
        <ViewToggle views={pageState.views} visibility={pageState.visibility} toggleView={handleToggleView} />
      </div>
  );
};

export default DXFView;
