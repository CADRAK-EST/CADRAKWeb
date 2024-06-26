﻿import * as THREE from 'three';
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

// New drawSolid function
export const drawSolid = (scene, solidData) => {
    const material = createMaterial(solidData.style, solidData.colour, solidData.weight);

    const shape = new THREE.Shape();
    solidData.points.forEach((point, index) => {
        if (index === 0) {
            shape.moveTo(point.x, point.y);
        } else {
            shape.lineTo(point.x, point.y);
        }
    });

    const geometry = new THREE.ShapeGeometry(shape);
    const solid = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: hexColorFromArray(solidData.colour) }));

    scene.add(solid);
    return solid;
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

// Store loaded fonts to avoid reloading
const loadedFonts = {};
let availableFonts = null; // To store available fonts from the manifest
const manifestPath = `${window.location.origin}/fonts/manifest.json`; // Path to the fonts manifest
const fetchFontsManifest = async () => {
    try {
        const response = await fetch(manifestPath);
        const data = await response.json();
        return data.fonts;
    } catch (error) {
        console.error('Error fetching fonts manifest:', error);
        return [];
    }
};
export const initializeFonts = async () => {
    if (!availableFonts) {
        availableFonts = await fetchFontsManifest();
    }
};

export const resetFonts = () => {
    availableFonts = null;
};

export const drawText = async (scene, textData) => {
    const loader = new FontLoader();
    await initializeFonts(); // Ensure fonts are initialized

    let fontPath;

    // Normalize font name to lowercase for comparison
    const normalizedFontName = textData.font ? textData.font.toLowerCase().replace('.ttf', '.json') : '';

    if (normalizedFontName && availableFonts.includes(normalizedFontName)) {
        fontPath = `${window.location.origin}/fonts/${normalizedFontName}`;
    } else {
        fontPath = `${window.location.origin}/fonts/tahoma.json`; // Default fallback font
    }
    

    return new Promise((resolve, reject) => {
        // Check if the font is already loaded
        if (loadedFonts[fontPath]) {
            const textMesh = createTextMesh(loadedFonts[fontPath], textData, scene);
            resolve(textMesh);
        } else {
            // Load the font and cache it
            loader.load(
                fontPath,
                (font) => {
                    loadedFonts[fontPath] = font;
                    const textMesh = createTextMesh(font, textData, scene);
                    resolve(textMesh);
                },
                undefined,
                error => {
                    console.error('Error loading font:', error);
                    reject(error);
                }
            );
        }
    });
};

// Cache text geometries
const textGeometryCache = {};

const createTextMesh = (font, textData, scene) => {
    const cacheKey = `${textData.text}-${textData.height}-${textData.font}`;
    let geometry = textGeometryCache[cacheKey];

    if (!geometry) {
        geometry = new TextGeometry(textData.text, {
            font: font,
            size: textData.height,
            depth: 0,
        });
        textGeometryCache[cacheKey] = geometry; // Cache the geometry
    }
    
    const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(textData.color) });
    const textMesh = new THREE.Mesh(geometry, material);

    // Calculate alignment offset
    geometry.computeBoundingBox();
    const boundingBox = geometry.boundingBox;

    let offsetX = 0;
    let offsetY = 0;

    // Apply the offset based on the attachment point
    switch (textData.attachment_point) {
        case 1: // MTEXT_TOP_LEFT
            offsetX = -boundingBox.min.x;
            offsetY = -boundingBox.max.y;
            break;
        case 2: // MTEXT_TOP_CENTER
            offsetX = -0.5 * (boundingBox.max.x + boundingBox.min.x);
            offsetY = -boundingBox.max.y;
            break;
        case 3: // MTEXT_TOP_RIGHT
            offsetX = -boundingBox.max.x;
            offsetY = -boundingBox.max.y;
            break;
        case 4: // MTEXT_MIDDLE_LEFT
            offsetX = -boundingBox.min.x;
            offsetY = -0.5 * (boundingBox.max.y + boundingBox.min.y);
            break;
        case 5: // MTEXT_MIDDLE_CENTER
            offsetX = -0.5 * (boundingBox.max.x + boundingBox.min.x);
            offsetY = -0.5 * (boundingBox.max.y + boundingBox.min.y);
            break;
        case 6: // MTEXT_MIDDLE_RIGHT
            offsetX = -boundingBox.max.x;
            offsetY = -0.5 * (boundingBox.max.y + boundingBox.min.y);
            break;
        case 7: // MTEXT_BOTTOM_LEFT
            offsetX = -boundingBox.min.x;
            offsetY = -boundingBox.min.y;
            break;
        case 8: // MTEXT_BOTTOM_CENTER
            offsetX = -0.5 * (boundingBox.max.x + boundingBox.min.x);
            offsetY = -boundingBox.min.y;
            break;
        case 9: // MTEXT_BOTTOM_RIGHT
            offsetX = -boundingBox.max.x;
            offsetY = -boundingBox.min.y;
            break;
        default:
            break;
    }

    // Apply alignment offset to position
    textMesh.position.set(textData.center[0] + offsetX, textData.center[1] + offsetY, 0);

    // Rotation
    if (textData.text_direction) {
        const directionVector = new THREE.Vector3(...textData.text_direction);
        const angle = Math.atan2(directionVector.y, directionVector.x);
        textMesh.rotation.z = angle;
    } else if (textData.rotation) {
        textMesh.rotation.z = THREE.MathUtils.degToRad(textData.rotation);
    }
    scene.add(textMesh);
    return textMesh;
};
