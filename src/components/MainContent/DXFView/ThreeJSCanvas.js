import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useDispatch } from 'react-redux';
import { updateCursorPosition } from '../../../slices/cursorPositionSlice';
import { createGrid } from './utils/grid';
import { setupCameraControls } from './utils/cameraControls';
import { drawLine, drawCircle, drawArc, drawText } from './utils/draw';
import { parseDXFJson } from './utils/parser';
import Highlight from './Highlight';
import ObjectClickHandler from './ObjectClickHandler';
import './DXFView.css';

const ThreeJSCanvas = ({ canvasRef, jsonData, setViews }) => {
    const localRef = useRef();
    const dispatch = useDispatch();
    const [renderer, setRenderer] = useState(null);
    const [camera, setCamera] = useState(null);
    const [objectInfo, setObjectInfo] = useState(null);
    const [views, setLocalViews] = useState([]);

    useEffect(() => {
        const currentRef = canvasRef || localRef;
        const scene = new THREE.Scene();
        const width = currentRef.current.clientWidth;
        const height = currentRef.current.clientHeight;

        const camera = new THREE.OrthographicCamera(
            width / -2, width / 2,
            height / 2, height / -2,
            1, 1000
        );
        camera.position.set(0, 0, 5);
        setCamera(camera);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor(0xffffff, 1);
        renderer.setSize(width, height);
        currentRef.current.appendChild(renderer.domElement);
        setRenderer(renderer);

        // Create and add the grid to the scene
        const grid = createGrid();
        grid.position.set(0, 0, 0);
        scene.add(grid);

        // Parse the JSON data
        const parsedData = jsonData ? parseDXFJson(jsonData) : null;

        // Store views for raycasting and visibility management
        const allViews = parsedData.views.map(view => ({
            ...view,
            visible: true,
            contours: {
                ...view.contours,
                lines: view.contours.lines.map(line => {
                    const lineMesh = drawLine(scene, line);
                    lineMesh.userData = line;
                    return lineMesh;
                }),
                circles: view.contours.circles.map(circle => {
                    const circleMesh = drawCircle(scene, circle);
                    circleMesh.userData = circle;
                    return circleMesh;
                }),
                arcs: view.contours.arcs.map(arc => {
                    const arcMesh = drawArc(scene, arc);
                    arcMesh.userData = arc;
                    return arcMesh;
                })
            }
        }));

        setViews(allViews);

        // Setup camera controls for zooming and panning with restrictions
        setupCameraControls(camera, renderer.domElement);

        const handleMouseMove = (event) => {
            const rect = currentRef.current.getBoundingClientRect();
            const mouse = new THREE.Vector2(
                ((event.clientX - rect.left) / rect.width) * 2 - 1,
                -((event.clientY - rect.top) / rect.height) * 2 + 1
            );

            const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
            vector.unproject(camera);

            const pos = new THREE.Vector3().copy(vector);
            const x = (pos.x / (camera.right - camera.left)) * width;
            const y = (pos.y / (camera.top - camera.bottom)) * height;

            dispatch(updateCursorPosition(pos.x, pos.y));
        };

        const handleClick = (event) => {
            const rect = currentRef.current.getBoundingClientRect();
            const mouse = new THREE.Vector2(
                ((event.clientX - rect.left) / rect.width) * 2 - 1,
                -((event.clientY - rect.top) / rect.height) * 2 + 1
            );

            const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
            vector.unproject(camera);

            const pos = new THREE.Vector3().copy(vector);
            const x = (pos.x / (camera.right - camera.left)) * width;
            const y = (pos.y / (camera.top - camera.bottom)) * height;

            dispatch(updateCursorPosition(pos.x, pos.y));
        };

        const canvasElement = currentRef.current;
        canvasElement.addEventListener('mousemove', handleMouseMove);
        canvasElement.addEventListener('click', handleClick);

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        // Adjust camera aspect ratio and renderer size on window resize
        const handleResize = () => {
            const newWidth = currentRef.current.clientWidth;
            const newHeight = currentRef.current.clientHeight;
            camera.left = newWidth / -2;
            camera.right = newWidth / 2;
            camera.top = newHeight / 2;
            camera.bottom = newHeight / -2;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            // Clean up
            renderer.dispose();
            window.removeEventListener('resize', handleResize);
            canvasElement.removeEventListener('mousemove', handleMouseMove);
            canvasElement.removeEventListener('click', handleClick);
        };
    }, [canvasRef, jsonData, dispatch]);

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