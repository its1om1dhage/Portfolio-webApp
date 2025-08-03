import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const palette = [
  0xff00cc, 0x00fff7, 0x7c3aed, 0xf59e0b, 0x10b981, 0xf43f5e, 0x6366f1, 0xfbbf24
];

const NeuralNetworkBackground = () => {
  const mountRef = useRef();

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0015);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1200);
    camera.position.set(0, 5, 22);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Starfield
    function createStarfield() {
      const count = 5000, pos = [];
      for (let i = 0; i < count; i++) {
        const r = THREE.MathUtils.randFloat(40, 120);
        const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
        const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
        pos.push(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        );
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.15,
        sizeAttenuation: true,
        depthWrite: false,
        opacity: 0.8,
        transparent: true
      });
      return new THREE.Points(geo, mat);
    }
    const starField = createStarfield();
    scene.add(starField);

    // --- Neural Network with nearest neighbors ---
    const nodeCount = 22; // adjust for density
    const nodePositions = [];
    const nodeColors = [];
    const nodesArray = [];
    for (let i = 0; i < nodeCount; i++) {
      const pos = new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(20),
        THREE.MathUtils.randFloatSpread(20),
        THREE.MathUtils.randFloatSpread(20)
      );
      nodePositions.push(pos.x, pos.y, pos.z);
      nodesArray.push(pos);
      // Assign a random color from the palette
      const color = new THREE.Color(palette[Math.floor(Math.random() * palette.length)]);
      nodeColors.push(color.r, color.g, color.b);
    }
    // Node geometry with color
    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));
    nodeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(nodeColors, 3));
    const nodeMaterial = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.7,
      transparent: true,
      opacity: 0.95
    });
    const nodes = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodes);

    // Connections: connect each node to its 3 nearest neighbors
    const connectionPositions = [];
    const connectionColors = [];
    const neighborCount = 7; // Increase for more lines, decrease for fewer

    for (let i = 0; i < nodeCount; i++) {
      // Find distances to all other nodes
      const dists = [];
      for (let j = 0; j < nodeCount; j++) {
        if (i !== j) {
          const dist = nodesArray[i].distanceTo(nodesArray[j]);
          dists.push({ j, dist });
        }
      }
      // Sort by distance and pick N nearest
      dists.sort((a, b) => a.dist - b.dist);
      for (let k = 0; k < neighborCount; k++) {
        const j = dists[k].j;
        // To avoid duplicate lines, only connect if i < j
        if (i < j) {
          connectionPositions.push(
            nodePositions[i * 3], nodePositions[i * 3 + 1], nodePositions[i * 3 + 2],
            nodePositions[j * 3], nodePositions[j * 3 + 1], nodePositions[j * 3 + 2]
          );
          const c1 = new THREE.Color(nodeColors[i * 3], nodeColors[i * 3 + 1], nodeColors[i * 3 + 2]);
          const c2 = new THREE.Color(nodeColors[j * 3], nodeColors[j * 3 + 1], nodeColors[j * 3 + 2]);
          connectionColors.push(c1.r, c1.g, c1.b);
          connectionColors.push(c2.r, c2.g, c2.b);
        }
      }
    }
    const connectionGeometry = new THREE.BufferGeometry();
    connectionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connectionPositions, 3));
    connectionGeometry.setAttribute('color', new THREE.Float32BufferAttribute(connectionColors, 3));
    const connectionMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.5
    });
    const connections = new THREE.LineSegments(connectionGeometry, connectionMaterial);
    scene.add(connections);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 5;
    controls.maxDistance = 100;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.15;
    controls.enablePan = false;

    // Parallax effect on scroll
    let scrollY = window.scrollY;
    const onScroll = () => {
      const newScrollY = window.scrollY;
      const delta = (newScrollY - scrollY) * 0.002;
      nodes.rotation.x += delta;
      connections.rotation.x += delta;
      scrollY = newScrollY;
    };
    window.addEventListener('scroll', onScroll);

    // Animation Loop
    const animate = () => {
      starField.rotation.y += 0.0003;
      nodes.rotation.y += 0.001;
      connections.rotation.y += 0.001;
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', onScroll);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        zIndex: 0,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    />
  );
};

export default NeuralNetworkBackground;