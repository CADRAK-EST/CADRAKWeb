import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useDispatch, useSelector } from 'react-redux';
import { updateCursorPosition } from '../../../slices/cursorPositionSlice';
import { setParsedData } from '../../../slices/parsedDataSlice';
import { createGrid } from './utils/grid';
import { setupCameraControls } from './utils/cameraControls';
import { drawLine, drawCircle, drawArc, drawEllipse, drawPolyline, drawText } from './utils/draw';
import { parseDXFJson } from './utils/parser';
import Highlight from './Highlight';
import ObjectClickHandler from './ObjectClickHandler';
import './DXFView.css';

const ThreeJSCanvas = ({ canvasRef }) => {
    const localRef = useRef();
    const dispatch = useDispatch();
    const parsedData = useSelector((state) => state.parsedData);
    const [renderer, setRenderer] = useState(null);
    const [camera, setCamera] = useState(null);
    const [objectInfo, setObjectInfo] = useState(null);
    const [views, setViews] = useState([]);
    const initialSetupRef = useRef(false);
    const scene = useRef(new THREE.Scene()); // Use ref for scene

    useEffect(() => {
        console.log('Initializing ThreeJSCanvas...');
        const currentRef = canvasRef || localRef;
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

        const grid = createGrid();
        grid.position.set(0, 0, 0);
        scene.current.add(grid);

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
            dispatch(updateCursorPosition({ x: pos.x, y: pos.y }));
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
            dispatch(updateCursorPosition({ x: pos.x, y: pos.y }));
        };

        const canvasElement = currentRef.current;
        canvasElement.addEventListener('mousemove', handleMouseMove);
        canvasElement.addEventListener('click', handleClick);

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene.current, camera);
        };
        animate();

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
            renderer.dispose();
            window.removeEventListener('resize', handleResize);
            canvasElement.removeEventListener('mousemove', handleMouseMove);
            canvasElement.removeEventListener('click', handleClick);
        };
    }, [canvasRef, dispatch]);

    useEffect(() => {
        console.log('Parsed data changed:', parsedData);
        if (parsedData && parsedData.views) {
            const allViews = parsedData.views.map(view => ({
                ...view,
                visible: true,
                contours: {
                    ...view.contours,
                    lines: view.contours.lines?.map(line => {
                        const lineMesh = drawLine(scene.current, line);
                        lineMesh.userData = line;
                        return lineMesh;
                    }) || [],
                    circles: view.contours.circles?.map(circle => {
                        const circleMesh = drawCircle(scene.current, circle);
                        circleMesh.userData = circle;
                        return circleMesh;
                    }) || [],
                    arcs: view.contours.arcs?.map(arc => {
                        const arcMesh = drawArc(scene.current, arc);
                        arcMesh.userData = arc;
                        return arcMesh;
                    }) || [],
                    ellipses: view.contours.ellipses?.map(ellipse => {
                        const ellipseMesh = drawEllipse(scene.current, ellipse);
                        ellipseMesh.userData = ellipse;
                        return ellipseMesh;
                    }) || [],
                    polylines: view.contours.polylines?.map(polyline => {
                        const polylineMesh = drawPolyline(scene.current, polyline);
                        polylineMesh.userData = polyline;
                        return polylineMesh;
                    }) || []
                }
            }));

            setViews(allViews);
            console.log('Views set:', allViews);
        }
    }, [parsedData]);

    useEffect(() => {
        // Update scene visibility based on view visibility
        views.forEach((view, index) => {
            const viewGroup = scene.current.getObjectByName(`view-${index}`);
            if (viewGroup) {
                viewGroup.visible = view.visible;
            }
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