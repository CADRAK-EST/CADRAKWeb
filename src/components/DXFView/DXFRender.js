import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './DXFRender.css';

const DXFRender = ({ fakeData, onCursorMove }) => {
  const mountRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
  
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    cameraRef.current = camera;
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    
    // Set the background color to light gray
    renderer.setClearColor(0xf0f0f0);
    
    mount.appendChild(renderer.domElement);
    
    // Add a grid helper
    const size = 1000; // Increase the size to make the grid appear everywhere
    const divisions = 100; // Increase the number of divisions for more detail
    const gridHelper = new THREE.GridHelper(size, divisions);
    gridHelper.rotation.x = Math.PI / 2; // Rotate the grid to align with the XY plane
    scene.add(gridHelper);
    
    // Adjust the camera's position
    camera.position.set(0, 0, 10); // Move the camera back along the Z axis
    camera.lookAt(0, 0, 0); // Ensure the camera is looking at the origin
    
    // Function to draw shapes
    const drawShapes = (data) => {
      data.lines.forEach(line => {
        const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
        const points = [];
        points.push(new THREE.Vector3(line.start.x, line.start.y, 0));
        points.push(new THREE.Vector3(line.end.x, line.end.y, 0));
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineObject = new THREE.Line(geometry, material);
        scene.add(lineObject);
      });

      data.circles.forEach(circle => {
        const geometry = new THREE.CircleGeometry(circle.radius, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const circleObject = new THREE.Mesh(geometry, material);
        circleObject.position.set(circle.center.x, circle.center.y, 0);
        scene.add(circleObject);
      });

      data.arcs.forEach(arc => {
        const curve = new THREE.ArcCurve(arc.center.x, arc.center.y, arc.radius, arc.startAngle, arc.endAngle);
        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
        const arcObject = new THREE.Line(geometry, material);
        scene.add(arcObject);
      });
    };

    drawShapes(fakeData);

    // Initialize OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableRotate = false; // Prevent the camera from rotating
    controls.screenSpacePanning = true; // Allow panning only in the XY plane
    controls.minDistance = 1; // Set the minimum zoom out distance
    controls.maxDistance = 100; // Set the maximum zoom out distance
    controlsRef.current = controls;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle mouse move to get cursor coordinates
    const handleMouseMove = (event) => {
      const rect = mount.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      const vector = new THREE.Vector3(x, y, 0.5).unproject(camera);
      onCursorMove(vector.x, vector.y);
    };

    mount.addEventListener('mousemove', handleMouseMove);

    // Cleanup on component unmount
    return () => {
      mount.removeEventListener('mousemove', handleMouseMove);
      mount.removeChild(renderer.domElement);
    };
  }, [fakeData, onCursorMove]);

  return <div ref={mountRef} className="drawing-area"></div>;
};

export default DXFRender;