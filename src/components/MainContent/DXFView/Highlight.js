import { useEffect } from 'react';
import * as THREE from 'three';
import { useDispatch } from 'react-redux';
import { updateCursorPosition } from '../../../slices/cursorPositionSlice';

const Highlight = ({ renderer, camera, views }) => {
    const dispatch = useDispatch();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredView = null;
    let origColors = new Map(); // To store the original colors of the hovered view

    useEffect(() => {
        const onMouseMove = (event) => {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            let intersects = [];
            let viewIntersects = null;

            // for (const view of views) {
            //     const viewObjects = view.contours.lines.concat(view.contours.circles, view.contours.arcs, view.contours.ellipses, view.contours.polylines);
            //     const viewIntersections = raycaster.intersectObjects(viewObjects);
            //     if (viewIntersections.length > 0) {
            //         intersects = viewIntersections;
            //         viewIntersects = view;
            //         break;
            //     }
            // }

            if (intersects.length > 0 && hoveredView !== viewIntersects) {
                if (hoveredView) {
                    hoveredView.contours.lines.forEach(line => line.material.color.set(origColors.get(line)));
                    hoveredView.contours.circles.forEach(circle => circle.material.color.set(origColors.get(circle)));
                    hoveredView.contours.arcs.forEach(arc => arc.material.color.set(origColors.get(arc)));
                    hoveredView.contours.ellipses.forEach(ellipse => ellipse.material.color.set(origColors.get(ellipse)));
                }
                hoveredView = viewIntersects;
                origColors.clear();
                hoveredView.contours.lines.forEach(line => {
                    origColors.set(line, line.material.color.getHex());
                    line.material.color.set(0xff0000);
                });
                hoveredView.contours.circles.forEach(circle => {
                    origColors.set(circle, circle.material.color.getHex());
                    circle.material.color.set(0xff0000);
                });
                hoveredView.contours.arcs.forEach(arc => {
                    origColors.set(arc, arc.material.color.getHex());
                    arc.material.color.set(0xff0000);
                });
                hoveredView.contours.ellipses.forEach(ellipse => {
                    origColors.set(ellipse, ellipse.material.color.getHex());
                    ellipse.material.color.set(0xff0000);
                });
            } else if (intersects.length === 0 && hoveredView) {
                hoveredView.contours.lines.forEach(line => line.material.color.set(origColors.get(line)));
                hoveredView.contours.circles.forEach(circle => circle.material.color.set(origColors.get(circle)));
                hoveredView.contours.arcs.forEach(arc => arc.material.color.set(origColors.get(arc)));
                hoveredView.contours.ellipses.forEach(ellipse => ellipse.material.color.set(origColors.get(ellipse)));
                hoveredView = null;
                origColors.clear();
            }

            const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera);
            dispatch(updateCursorPosition(vector.x, vector.y));
        };

        renderer.domElement.addEventListener('mousemove', onMouseMove);

        return () => {
            renderer.domElement.removeEventListener('mousemove', onMouseMove);
        };
    }, [renderer, camera, views, dispatch]);

    return null;
};

export default Highlight;
