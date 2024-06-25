import * as THREE from 'three';

export const createGrid = () => {
    const size = 10000; // Grid size
    const divisions = 200; // Number of divisions
    const gridColor = 0xcccccc; // Lighter color for grid lines

    // Create grid
    const gridHelper = new THREE.GridHelper(size, divisions, gridColor, gridColor);
    gridHelper.material = new THREE.LineBasicMaterial({ color: gridColor, linewidth: 1 }); // Subtle grid lines

    // Rotate the grid to lie on the XY plane
    gridHelper.rotation.x = Math.PI / 2;

    return gridHelper;
};
