import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useDispatch } from 'react-redux';
import { updateCursorPosition } from '../../../slices/cursorPositionSlice';
import { createGrid } from './utils/grid';
import { setupCameraControls } from './utils/cameraControls';
import Highlight from './Highlight';
import { drawLine, drawCircle, drawArc, drawEllipse, drawPolyline } from './utils/draw';
import ObjectClickHandler from './ObjectClickHandler';
import './DXFView.css';
import { clearParsedData } from '../../../slices/parsedDataSlice';

const ThreeJSCanvas = ({ canvasRef, views }) => {
    const localRef = useRef();
    const dispatch = useDispatch();
    const [renderer, setRenderer] = useState(null);
    const [camera, setCamera] = useState(null);
    const [objectInfo, setObjectInfo] = useState(null);
    const scene = useRef(new THREE.Scene());
    const initialSetupRef = useRef(false);

    useEffect(() => {
        if (initialSetupRef.current) return;
        initialSetupRef.current = true;

        const currentRef = canvasRef || localRef;
        const width = currentRef.current.clientWidth;
        const height = currentRef.current.clientHeight;

        const newCamera = new THREE.OrthographicCamera(
            width / -2, width / 2,
            height / 2, height / -2,
            1, 1000
        );
        newCamera.position.set(0, 0, 5);
        setCamera(newCamera);

        const newRenderer = new THREE.WebGLRenderer({ antialias: true });
        newRenderer.setClearColor(0xffffff, 1);
        newRenderer.setSize(width, height);
        currentRef.current.appendChild(newRenderer.domElement);
        setRenderer(newRenderer);

        const grid = createGrid();
        grid.position.set(0, 0, 0);
        scene.current.add(grid);

        setupCameraControls(newCamera, newRenderer.domElement);

        const handleMouseMove = (event) => {
            const rect = currentRef.current.getBoundingClientRect();
            const mouse = new THREE.Vector2(
                ((event.clientX - rect.left) / rect.width) * 2 - 1,
                -((event.clientY - rect.top) / rect.height) * 2 + 1
            );

            const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
            vector.unproject(newCamera);

            const pos = new THREE.Vector3().copy(vector);
            dispatch(updateCursorPosition({ x: pos.x, y: pos.y }));
        };

        const canvasElement = currentRef.current;
        canvasElement.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            requestAnimationFrame(animate);
            newRenderer.render(scene.current, newCamera);
        };
        animate();

        const handleResize = () => {
            const newWidth = currentRef.current.clientWidth;
            const newHeight = currentRef.current.clientHeight;
            newCamera.left = newWidth / -2;
            newCamera.right = newWidth / 2;
            newCamera.top = newHeight / 2;
            newCamera.bottom = newHeight / -2;
            newCamera.updateProjectionMatrix();
            newRenderer.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            newRenderer.dispose();
            window.removeEventListener('resize', handleResize);
            canvasElement.removeEventListener('mousemove', handleMouseMove);
        };
    }, [canvasRef, dispatch]);

    useEffect(() => {
        console.log("2nd useEffect called")
        // Clear old objects from scene
        while (scene.current.children.length > 0) {
            scene.current.remove(scene.current.children[0]);
        }

        // Add grid
        const grid = createGrid();
        scene.current.add(grid);

        // Draw new objects based on views
        views.forEach((view, index) => {
            let viewGroup = scene.current.getObjectByName(`view-${index}`);
            if (!viewGroup) {
                viewGroup = new THREE.Group();
                viewGroup.name = `view-${index}`;
                if (view.contours) {
                    if (view.contours.lines) {
                        view.contours.lines.forEach(line => {
                            const lineMesh = drawLine(scene.current, line);
                            lineMesh.userData = line;
                            viewGroup.add(lineMesh);
                        });
                    }

                    if (view.contours.circles) {
                        view.contours.circles.forEach(circle => {
                            const circleMesh = drawCircle(scene.current, circle);
                            circleMesh.userData = circle;
                            viewGroup.add(circleMesh);
                        });
                    }

                    if (view.contours.arcs) {
                        view.contours.arcs.forEach(arc => {
                            const arcMesh = drawArc(scene.current, arc);
                            arcMesh.userData = arc;
                            viewGroup.add(arcMesh);
                        });
                    }

                    if (view.contours.ellipses) {
                        view.contours.ellipses.forEach(ellipse => {
                            const ellipseMesh = drawEllipse(scene.current, ellipse);
                            ellipseMesh.userData = ellipse;
                            viewGroup.add(ellipseMesh);
                        });
                    }

                    if (view.contours.polylines) {
                        view.contours.polylines.forEach(polyline => {
                            const polylineMesh = drawPolyline(scene.current, polyline);
                            polylineMesh.userData = polyline;
                            viewGroup.add(polylineMesh);
                        });
                    }
                }
                scene.current.add(viewGroup);
            }
            viewGroup.visible = view.visible;
        });
    }, [views]);

    return (
        <div ref={canvasRef || localRef} className="threejs-canvas">
            {renderer && camera && views.length > 0 && (
                <>
                    <Highlight renderer={renderer} camera={camera} views={views} />
                    <ObjectClickHandler renderer={renderer} camera={camera} views={views} setObjectInfo={setObjectInfo} />
                </>
            )}
        </div>
    );
};

export default ThreeJSCanvas;
