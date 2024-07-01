import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useDispatch, useSelector } from 'react-redux';
import { updateCursorPosition } from '../../../slices/cursorPositionSlice';
import { createGrid } from './utils/grid';
import { setPageLoaded } from '../../../slices/pageDataSlice';
import { setupCameraControls } from './utils/cameraControls';
import Highlight from './Highlight';
import {
    drawSolid,
    drawLine,
    drawCircle,
    drawArc,
    drawEllipse,
    drawPolyline,
    drawText,
    initializeFonts,
    resetFonts
} from './utils/draw';
import ObjectClickHandler from './ObjectClickHandler';
import './DXFView.css';
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";

const ThreeJSCanvas = ({ canvasRef, views, visibility, texts, metadata = {}  }) => {
    const localRef = useRef();
    const dispatch = useDispatch();
    const [renderer, setRenderer] = useState(null);
    const [camera, setCamera] = useState(null);
    const scene = useRef(new THREE.Scene());
    const initialSetupRef = useRef(false);
    const [controls, setControls] = useState(null);

    const isPageLoaded = useSelector((state) => state.pageData.isPageLoaded);

    // Function to clear the scene except for the grid
    const clearScene = () => {
        const grid = scene.current.children.find(child => child.name === 'grid');
        scene.current.children = grid ? [grid] : [];
    };

    useEffect(() => {
        window.clearScene = clearScene; // Make clearScene globally accessible
    }, []);
    
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
        newCamera.up.set(0, 1, 0); // Ensure camera up vector is set correctly
        setCamera(newCamera);

        const newRenderer = new THREE.WebGLRenderer({ antialias: true });
        newRenderer.setClearColor(0xffffff, 1);
        newRenderer.setSize(width, height);
        currentRef.current.appendChild(newRenderer.domElement);
        setRenderer(newRenderer);

        // const grid = createGrid();
        // grid.position.set(0, 0, 0);
        // scene.current.add(grid);


        // Initialize controls with the initial target at the center
        const initialTarget = new THREE.Vector3(0, 0, 0);
        const newControls = setupCameraControls(newCamera, newRenderer.domElement, initialTarget);
        setControls(newControls);

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
            // Lock camera's up vector to prevent unintended rotation
            // newCamera.up.set(0, 1, 0);
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

    const addShape = (shapeData, viewGroup, func) => {
        shapeData.forEach(shape => {
            const shapeMesh = func(scene.current, shape);
            shapeMesh.userData = shape;
            viewGroup.add(shapeMesh);
        });
    }

    const addTextMesh = async (textData, viewGroup) => {
        try {
            const textMesh = await drawText(scene.current, textData);
            if (textMesh.geometry instanceof TextGeometry) {
                textMesh.userData = { isText: true };
                scene.current.add(textMesh);
                viewGroup.add(textMesh);
            } else {
                console.error('Invalid object type:', textMesh);
            }
        } catch (error) {
            console.error('Error creating text mesh:', error);
        }
    }

    useEffect(() => {
        console.log("I got called!")
        let viewGroups = scene.current.children.filter(child => child.name && child.name.startsWith('view-'));
        // Clear old objects from scene
        viewGroups.forEach((viewGroup) => {
            if (!viewGroup.visible) {
                scene.current.remove(viewGroup);
            }
        })

        // // Add grid
        // const grid = createGrid();
        // scene.current.add(grid);

        // Draw new objects based on views
        views.forEach((view, index) => {
            let viewGroup = scene.current.getObjectByName(`view-${index}`);
            if (!viewGroup) {
                viewGroup = new THREE.Group();
                viewGroup.name = `view-${index}`;
                if (view.contours) {
                    let contours = view.contours;
                    if (contours.lines) {
                        addShape(contours.lines, viewGroup, drawLine);
                    }

                    if (contours.circles) {
                        addShape(contours.circles, viewGroup, drawCircle)
                    }

                    if (contours.arcs) {
                        addShape(contours.arcs, viewGroup, drawArc);
                    }

                    if (contours.ellipses) {
                        addShape(contours.ellipses, viewGroup, drawEllipse)
                    }

                    if (contours.polylines) {
                        addShape(contours.polylines, viewGroup, drawPolyline)
                    }

                    // Clear the fonts
                    resetFonts();
                    initializeFonts().then(() => {
                        if (view.texts) {
                            view.texts.forEach(text => {
                                addTextMesh(text, viewGroup);
                            });
                        }
                    });
                    
                }

                if (view.dimensions) {
                    view.dimensions.forEach(dimension => {
                        let contours = dimension.contours;
                        if (contours.lines) {
                            addShape(contours.lines, viewGroup, drawLine);
                        }
                        if (contours.solids) {
                            addShape(contours.solids, viewGroup, drawSolid);
                        }
                        if (dimension.texts) {
                            Object.entries(dimension.texts).forEach(textType => {
                                if (textType.length > 0 && textType[1].length > 0) {
                                    textType.forEach(text => {
                                            addTextMesh(text, viewGroup);
                                    });
                                } else {
                                    console.log("textType is empty")
                                }
                            });
                        }
                    })
                }
                scene.current.add(viewGroup);
            }
            viewGroup.visible = visibility[index];
        });

        const adjustCameraToBoundingBox = (boundingBox, camera, renderer) => {
            if (!camera || !renderer) return;

            const width = boundingBox.max.x - boundingBox.min.x;
            const height = boundingBox.max.y - boundingBox.min.y;

            const centerX = (boundingBox.max.x + boundingBox.min.x) / 2;
            const centerY = (boundingBox.max.y + boundingBox.min.y) / 2;

            const aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;

            let newWidth, newHeight;

            if (width / aspect > height) {
                newWidth = width;
                newHeight = width / aspect;
            } else {
                newWidth = height * aspect;
                newHeight = height;
            }

            // Center the camera
            camera.position.set(centerX, centerY, camera.position.z);

            // Adjust the camera zoom to fit the bounding box
            const zoomFactor = Math.min(
                renderer.domElement.clientWidth / newWidth,
                renderer.domElement.clientHeight / newHeight
            );

            controls.target = new THREE.Vector3(centerX, centerY, 0);

            camera.zoom = zoomFactor;
            camera.updateProjectionMatrix();

            if (controls) {
                controls.target.set(centerX, centerY, 0);

                // Update panning and zoom limits
                const panLimitBuffer = 100;
                controls.panLimits = {
                    min: new THREE.Vector3(boundingBox.min.x - panLimitBuffer, boundingBox.min.y - panLimitBuffer, 0),
                    max: new THREE.Vector3(boundingBox.max.x + panLimitBuffer, boundingBox.max.y + panLimitBuffer, 0)
                };
                controls.minZoom = zoomFactor / 2; // Example: half of the fitted zoom
                controls.maxZoom = zoomFactor * 4; // Example: double of the fitted zoom

                controls.update();
            }
        };


        // Adjust camera to fit the bounding box
        if (views.length > 0 && metadata.bounding_box && !isPageLoaded) {
            const boundingBox = {
                min: { x: metadata.bounding_box[0], y: metadata.bounding_box[1] },
                max: { x: metadata.bounding_box[2], y: metadata.bounding_box[3] },
            };
            
            adjustCameraToBoundingBox(boundingBox, camera, renderer);
            dispatch(setPageLoaded()); // Set the page loaded state to true
        }
    }, [views, visibility, texts, isPageLoaded, dispatch]);

    return (
        <div ref={canvasRef || localRef} className="threejs-canvas">
            {renderer && camera && views.length > 0 && (
                <>
                    <Highlight renderer={renderer} camera={camera} views={views} />
                    <ObjectClickHandler renderer={renderer} camera={camera} views={views}/>
                </>
            )}
        </div>
    );
};

export default ThreeJSCanvas;
