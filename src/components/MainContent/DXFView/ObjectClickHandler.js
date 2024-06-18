import React, { useEffect } from 'react';
import * as THREE from 'three';
import { useDispatch } from 'react-redux';
import { updateCursorPosition } from '../../../slices/cursorPositionSlice';

const ObjectClickHandler = ({ renderer, camera, views, setObjectInfo }) => {
    const dispatch = useDispatch();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    useEffect(() => {
        const onClick = (event) => {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            let intersects = [];
            for (const view of views) {
                const viewObjects = view.contours.lines.concat(view.contours.circles, view.contours.arcs);
                    const viewIntersections = raycaster.intersectObjects(viewObjects);
                    if (viewIntersections.length > 0) {
                        intersects = viewIntersections;
                        break;
                }
            }

            if (intersects.length > 0) {
                setObjectInfo(null); // Do not set any information
            }

            const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera);
            dispatch(updateCursorPosition(vector.x, vector.y));
        };

        renderer.domElement.addEventListener('click', onClick);

        return () => {
            renderer.domElement.removeEventListener('click', onClick);
        };
    }, [renderer, camera, views, dispatch, setObjectInfo]);

    return null;
};

export default ObjectClickHandler;
