import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './DXFRender.css';

const DXFRender = ({ onCursorMove, parsedData }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const rendererRef = useRef(null);
  const requestIDRef = useRef(null);
  const shapesRef = useRef([]);

  useEffect(() => {
    const mount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.set(0, 0, 500);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer();
    rendererRef.current = renderer;
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const handleMouseMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Convert to world coordinates
      const vector = new THREE.Vector3(x, y, 0.5).unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      onCursorMove(pos.x, pos.y);
    };

    renderer.domElement.addEventListener('mousemove', handleMouseMove);

    // Grid setup
    const size = 10000;
    const divisions = 100;
    const gridHelper = new THREE.GridHelper(size, divisions);
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);

    // Initialize OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableRotate = false;
    controls.screenSpacePanning = true;
    controls.minDistance = 10;
    controls.maxDistance = 1000;
    controlsRef.current = controls;

    controls.addEventListener('change', () => {
      renderer.render(scene, camera);
    });

    // Render loop
    const animate = () => {
      requestIDRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(requestIDRef.current);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      controls.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (!parsedData) return;

    console.log('--DXFRender.js-- Drawing Shapes:', parsedData);

    const scene = sceneRef.current;

    // Remove previous shapes
    shapesRef.current.forEach(shape => scene.remove(shape));
    shapesRef.current = [];

    // Drawing shapes
    const drawShapes = (data) => {
      if (!data) return;

      if (data.lines) {
        data.lines.forEach(line => {
          const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
          const points = [];
          points.push(new THREE.Vector3(line.start.x, line.start.y, 0));
          points.push(new THREE.Vector3(line.end.x, line.end.y, 0));
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const lineObject = new THREE.Line(geometry, material);
          scene.add(lineObject);
          shapesRef.current.push(lineObject);
        });
      }

      if (data.circles) {
        data.circles.forEach(circle => {
          const geometry = new THREE.CircleGeometry(circle.radius, 32);
          const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
          const circleObject = new THREE.Mesh(geometry, material);
          circleObject.position.set(circle.center.x, circle.center.y, 0);
          scene.add(circleObject);
          shapesRef.current.push(circleObject);
        });
      }

      if (data.arcs) {
        data.arcs.forEach(arc => {
          const curve = new THREE.ArcCurve(arc.center.x, arc.center.y, arc.radius, arc.startAngle, arc.endAngle);
          const points = curve.getPoints(50);
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
          const arcObject = new THREE.Line(geometry, material);
          scene.add(arcObject);
          shapesRef.current.push(arcObject);
        });
      }

      if (data.title_block && data.title_block.texts) {
        data.title_block.texts.forEach(textItem => {
          const spriteMaterial = new THREE.SpriteMaterial({
            map: createTextTexture(textItem.text),
            transparent: true
          });
          const sprite = new THREE.Sprite(spriteMaterial);
          sprite.position.set(textItem.position[0], textItem.position[1], 0); // Adjust Z position to 0
          sprite.scale.set(100, 50, 1); // Adjust scale for better visibility
          scene.add(sprite);
          shapesRef.current.push(sprite);
        });
      }
    };

    const createTextTexture = (text) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context.font = '24px Arial';
      context.fillStyle = 'black';
      context.fillText(text, 0, 24);
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    drawShapes(parsedData);

    // Re-add the grid helper
    const size = 10000;
    const divisions = 100;
    const gridHelper = new THREE.GridHelper(size, divisions);
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);
    shapesRef.current.push(gridHelper);

    // Render the updated scene
    rendererRef.current.render(scene, cameraRef.current);

  }, [parsedData]);

  return <div ref={mountRef} className="dxf-render" />;
};

export default DXFRender;
