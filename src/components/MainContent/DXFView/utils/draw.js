import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const hexColorFromArray = (colorArray) => {
    const color = new THREE.Color(colorArray[0], colorArray[1], colorArray[2]);
    return color.getHex();
};

export const drawLine = (scene, lineData) => {
    const material = new THREE.LineBasicMaterial({
        color: hexColorFromArray(lineData.colour),
        linewidth: lineData.weight
    });
    const points = [];
    points.push(new THREE.Vector3(lineData.start.x, lineData.start.y, 0));
    points.push(new THREE.Vector3(lineData.end.x, lineData.end.y, 0));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    scene.add(line);
    return line; // Ensure the line mesh is returned
};

export const drawCircle = (scene, circleData) => {
    const material = new THREE.LineBasicMaterial({
        color: hexColorFromArray(circleData.colour),
        linewidth: circleData.weight
    });
    const geometry = new THREE.CircleGeometry(circleData.radius, 32);
    geometry.translate(circleData.centre.x, circleData.centre.y, 0);
    const edges = new THREE.EdgesGeometry(geometry);
    const circle = new THREE.LineSegments(edges, material);
    scene.add(circle);
    return circle; // Ensure the circle mesh is returned
};

export const drawArc = (scene, arcData) => {
    const material = new THREE.LineBasicMaterial({
        color: hexColorFromArray(arcData.colour),
        linewidth: arcData.weight
    });
    const curve = new THREE.ArcCurve(
        arcData.centre.x, arcData.centre.y, arcData.radius,
        THREE.MathUtils.degToRad(arcData.start_angle),
        THREE.MathUtils.degToRad(arcData.end_angle), false
    );
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const arc = new THREE.Line(geometry, material);
    scene.add(arc);
    return arc; // Ensure the arc mesh is returned
};

export const drawText = (scene, textData) => {
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
        const geometry = new TextGeometry(textData.text, {
            font: font,
            size: textData.size,
            height: 0,
        });
        const material = new THREE.MeshBasicMaterial({ color: hexColorFromArray(textData.colour) });
        const text = new THREE.Mesh(geometry, material);
        text.position.set(textData.position.x, textData.position.y, 0);
        text.rotation.z = THREE.MathUtils.degToRad(textData.rotation);
        scene.add(text);
    });
};
