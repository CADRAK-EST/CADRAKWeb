import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const setupCameraControls = (camera, domElement, initialTarget = new THREE.Vector3(0, 0, 0)) => {
    const controls = new OrbitControls(camera, domElement);
    controls.enableRotate = false;

    // Set the initial target
    controls.target.copy(initialTarget);

    // Enable panning
    controls.enablePan = true;
    controls.screenSpacePanning = true;  // Ensure panning in screen space

    // Set zoom limits
    controls.minZoom = 0.4;  // Adjust the minimum zoom level as needed
    controls.maxZoom = 5;    // Adjust the maximum zoom level as needed

    // Set pan limits
    const panLimits = {
        min: new THREE.Vector3(-700, -700, 0), // Adjust these values as needed
        max: new THREE.Vector3(1200, 1200, 0),   // Adjust these values as needed
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
        controls.target.x = Math.max(panLimits.min.x, Math.min(panLimits.max.x, controls.target.x));
        controls.target.y = Math.max(panLimits.min.y, Math.min(panLimits.max.y, controls.target.y));

        // Restrict camera position
        camera.position.x = Math.max(panLimits.min.x, Math.min(panLimits.max.x, camera.position.x));
        camera.position.y = Math.max(panLimits.min.y, Math.min(panLimits.max.y, camera.position.y));

        // // Ensure the z-coordinate remains fixed
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
