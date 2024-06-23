import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const hexColorFromArray = (color) => {
    const colorObj = new THREE.Color();
    colorObj.setHex(color);
    return colorObj.getHex();
};

const createMaterial = (style, color, weight) => {
    let material;
    switch (style.toLowerCase()) {
        case 'dashed':
            material = new THREE.LineDashedMaterial({
                color: hexColorFromArray(color),
                linewidth: weight,
                dashSize: 3,
                gapSize: 1
            });
            break;
        case 'chain':
            material = new THREE.LineDashedMaterial({
                color: hexColorFromArray(color),
                linewidth: weight,
                dashSize: 3,
                gapSize: 2
            });
            break;
        case 'continuous':
        default:
            material = new THREE.LineBasicMaterial({
                color: hexColorFromArray(color),
                linewidth: weight
            });
            break;
    }
    return material;
};

export const drawLine = (scene, lineData) => {
    const material = createMaterial(lineData.style, lineData.colour, lineData.weight);
    const points = [];
    points.push(new THREE.Vector3(lineData.start.x, lineData.start.y, 0));
    points.push(new THREE.Vector3(lineData.end.x, lineData.end.y, 0));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    if (material instanceof THREE.LineDashedMaterial) {
        line.computeLineDistances();
    }
    scene.add(line);
    return line; // Ensure the line mesh is returned
};

export const drawCircle = (scene, circleData) => {
    const material = createMaterial(circleData.style, circleData.colour, circleData.weight);
    const geometry = new THREE.CircleGeometry(circleData.radius, 32);
    geometry.translate(circleData.centre.x, circleData.centre.y, 0);
    const edges = new THREE.EdgesGeometry(geometry);
    const circle = new THREE.LineSegments(edges, material);
    if (material instanceof THREE.LineDashedMaterial) {
        circle.computeLineDistances();
    }
    scene.add(circle);
    return circle; // Ensure the circle mesh is returned
};

export const drawArc = (scene, arcData) => {
    const material = createMaterial(arcData.style, arcData.colour, arcData.weight);
    const curve = new THREE.ArcCurve(
        arcData.centre.x, arcData.centre.y, arcData.radius,
        THREE.MathUtils.degToRad(arcData.start_angle),
        THREE.MathUtils.degToRad(arcData.end_angle), false
    );
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const arc = new THREE.Line(geometry, material);
    if (material instanceof THREE.LineDashedMaterial) {
        arc.computeLineDistances();
    }
    scene.add(arc);
    return arc; // Ensure the arc mesh is returned
};

export const drawEllipse = (scene, ellipseData) => {
    const material = createMaterial(ellipseData.style, ellipseData.colour, ellipseData.weight);
    const curve = new THREE.EllipseCurve(
        0, 0, // Start at the origin
        ellipseData.major_axis_length / 2, ellipseData.minor_axis_length / 2,
        0, 2 * Math.PI, false, 0
    );
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const ellipse = new THREE.Line(geometry, material);
    ellipse.rotation.z = THREE.MathUtils.degToRad(ellipseData.rotation_angle);
    ellipse.position.set(ellipseData.centre.x, ellipseData.centre.y, 0);
    if (material instanceof THREE.LineDashedMaterial) {
        ellipse.computeLineDistances();
    }
    scene.add(ellipse);
    return ellipse;
};

export const drawPolyline = (scene, polylineData) => {
    const material = createMaterial(polylineData.style, polylineData.colour, polylineData.weight);
    const points = polylineData.points.map(point => new THREE.Vector3(point.x, point.y, 0));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const polyline = new THREE.Line(geometry, material);
    if (material instanceof THREE.LineDashedMaterial) {
        polyline.computeLineDistances();
    }
    scene.add(polyline);
    return polyline;
};

export const drawText = (scene, textData) => {
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
        const geometry = new TextGeometry(textData.text, {
            font: font,
            size: textData.height,
            height: 0,
        });
        const material = new THREE.MeshBasicMaterial({ color: textData.colour });
        const textMesh = new THREE.Mesh(geometry, material);
        textMesh.position.set(textData.center[0], textData.center[1], 0);
        scene.add(textMesh);
    });
};
