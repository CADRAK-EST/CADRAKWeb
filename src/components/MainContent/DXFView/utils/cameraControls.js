import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const setupCameraControls = (camera, domElement, initialTarget = new THREE.Vector3(0, 0, 0), panLimits = {}, zoomLimits = {}) => {
    const controls = new OrbitControls(camera, domElement);
    controls.enableRotate = false;

    // Set the initial target
    controls.target.copy(initialTarget);

    // Enable panning
    controls.enablePan = true;
    controls.screenSpacePanning = true;  // Ensure panning in screen space

    // Set zoom limits
    controls.minZoom = zoomLimits.min || 0.4;  // Default minimum zoom level
    controls.maxZoom = zoomLimits.max || 5;    // Default maximum zoom level

    // Set pan limits
    controls.panLimits = {
        min: panLimits.min || new THREE.Vector3(-700, -700, 0), // Default values
        max: panLimits.max || new THREE.Vector3(1200, 1200, 0), // Default values
    };

    // Change mouse button assignments
    controls.mouseButtons = {
        LEFT: THREE.MOUSE.PAN, // Use left mouse button for panning
        MIDDLE: THREE.MOUSE.DOLLY, // Use middle mouse button for zooming
        RIGHT: THREE.MOUSE.PAN // Optional: use right mouse button for panning as well
    };

    const fixedZ = camera.position.z; // Store the initial z-coordinate

    controls.addEventListener('change', () => {
        // Restrict panning
        controls.target.x = Math.max(controls.panLimits.min.x, Math.min(controls.panLimits.max.x, controls.target.x));
        controls.target.y = Math.max(controls.panLimits.min.y, Math.min(controls.panLimits.max.y, controls.target.y));

        // Restrict camera position
        camera.position.x = Math.max(controls.panLimits.min.x, Math.min(controls.panLimits.max.x, camera.position.x));
        camera.position.y = Math.max(controls.panLimits.min.y, Math.min(controls.panLimits.max.y, camera.position.y));

        // Ensure the z-coordinate remains fixed
        camera.position.z = fixedZ;

        // Restrict zooming
        camera.zoom = Math.max(controls.minZoom, Math.min(controls.maxZoom, camera.zoom));
        camera.updateProjectionMatrix();

        // Ensure rotation around the y-axis is 0
        camera.rotation.y = 0;
    });

    // Disable damping for instant panning effect
    controls.enableDamping = false;

    // Ensure rotation is completely disabled
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 2;

    return controls;
};
