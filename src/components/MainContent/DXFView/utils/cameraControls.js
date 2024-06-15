import * as THREE from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls';

export const setupCameraControls = (camera, domElement) => {
    const controls = new MapControls(camera, domElement);

    // Enable panning
    controls.enablePan = true;
    controls.screenSpacePanning = true;  // Ensure panning in screen space

    // Set zoom limits
    controls.minZoom = 0.5;  // Adjust the minimum zoom level as needed
    controls.maxZoom = 3;    // Adjust the maximum zoom level as needed

    // Set pan limits
    const panLimits = {
        min: new THREE.Vector3(-500, -500, 0), // Adjust these values as needed
        max: new THREE.Vector3(500, 500, 0),   // Adjust these values as needed
    };

    controls.addEventListener('change', () => {
        // Restrict panning
        controls.target.x = Math.max(panLimits.min.x, Math.min(panLimits.max.x, controls.target.x));
        controls.target.y = Math.max(panLimits.min.y, Math.min(panLimits.max.y, controls.target.y));

        // Restrict camera position
        camera.position.x = Math.max(panLimits.min.x, Math.min(panLimits.max.x, camera.position.x));
        camera.position.y = Math.max(panLimits.min.y, Math.min(panLimits.max.y, camera.position.y));

        // Restrict zooming
        camera.zoom = Math.max(controls.minZoom, Math.min(controls.maxZoom, camera.zoom));
        camera.updateProjectionMatrix();
    });


    return controls;
};
