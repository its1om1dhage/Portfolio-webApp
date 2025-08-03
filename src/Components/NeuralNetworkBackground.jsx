import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const palette = [
  0xff00cc, 0x00fff7, 0x7c3aed, 0xf59e0b, 0x10b981, 0xf43f5e, 0x6366f1, 0xfbbf24
];

const NODE_COUNT = 30; // Large network
const NEIGHBOR_COUNT = 3; // More lines per node
const NETWORK_WIDTH = 300; // Spread nodes wider

const NeuralNetworkBackground = () => {
  const mountRef = useRef();

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0015);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    camera.position.set(0, 5, 120);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Starfield
    function createStarfield() {
      const count = 5000, pos = [];
      for (let i = 0; i < count; i++) {
        const r = THREE.MathUtils.randFloat(NETWORK_WIDTH, NETWORK_WIDTH * 2);
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

    // --- Neural Network with morphing nodes ---
    // Store base positions and morph targets
    const basePositions = [];
    const morphTargets = [];
    const nodeColors = [];
    const nodesArray = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const pos = new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(NETWORK_WIDTH),
        THREE.MathUtils.randFloatSpread(NETWORK_WIDTH * 0.5),
        THREE.MathUtils.randFloatSpread(NETWORK_WIDTH * 0.5)
      );
      basePositions.push(pos);
      morphTargets.push(new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(NETWORK_WIDTH),
        THREE.MathUtils.randFloatSpread(NETWORK_WIDTH * 0.5),
        THREE.MathUtils.randFloatSpread(NETWORK_WIDTH * 0.5)
      ));
      // Assign a random color from the palette
      const color = new THREE.Color(palette[Math.floor(Math.random() * palette.length)]);
      nodeColors.push(color.r, color.g, color.b);
      nodesArray.push(pos.clone());
    }

    // Node geometry with color
    const nodeGeometry = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      nodePositions[i * 3] = basePositions[i].x;
      nodePositions[i * 3 + 1] = basePositions[i].y;
      nodePositions[i * 3 + 2] = basePositions[i].z;
    }
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    nodeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(nodeColors, 3));
    const nodeMaterial = new THREE.PointsMaterial({
      vertexColors: true,
      size: 1.1,
      transparent: true,
      opacity: 0.95
    });
    const nodes = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodes);

    // Connections
    let connectionPositions = [];
    let connectionColors = [];
    let connectionGeometry, connections;

    function updateConnections(currentPositions, colorShift = 0) {
      connectionPositions = [];
      connectionColors = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        // Find distances to all other nodes
        const dists = [];
        for (let j = 0; j < NODE_COUNT; j++) {
          if (i !== j) {
            const dx = currentPositions[i * 3] - currentPositions[j * 3];
            const dy = currentPositions[i * 3 + 1] - currentPositions[j * 3 + 1];
            const dz = currentPositions[i * 3 + 2] - currentPositions[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            dists.push({ j, dist });
          }
        }
        // Sort by distance and pick N nearest
        dists.sort((a, b) => a.dist - b.dist);
        for (let k = 0; k < NEIGHBOR_COUNT; k++) {
          const j = dists[k].j;
          if (i < j) {
            connectionPositions.push(
              currentPositions[i * 3], currentPositions[i * 3 + 1], currentPositions[i * 3 + 2],
              currentPositions[j * 3], currentPositions[j * 3 + 1], currentPositions[j * 3 + 2]
            );
            // Color: animate hue over time
            const baseColor1 = new THREE.Color(nodeColors[i * 3], nodeColors[i * 3 + 1], nodeColors[i * 3 + 2]);
            const baseColor2 = new THREE.Color(nodeColors[j * 3], nodeColors[j * 3 + 1], nodeColors[j * 3 + 2]);
            baseColor1.offsetHSL(colorShift, 0, 0);
            baseColor2.offsetHSL(colorShift, 0, 0);
            connectionColors.push(baseColor1.r, baseColor1.g, baseColor1.b);
            connectionColors.push(baseColor2.r, baseColor2.g, baseColor2.b);
          }
        }
      }
      if (connections) {
        scene.remove(connections);
        connectionGeometry.dispose();
      }
      connectionGeometry = new THREE.BufferGeometry();
      connectionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connectionPositions, 3));
      connectionGeometry.setAttribute('color', new THREE.Float32BufferAttribute(connectionColors, 3));
      const connectionMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.35
      });
      connections = new THREE.LineSegments(connectionGeometry, connectionMaterial);
      scene.add(connections);
    }

    updateConnections(nodePositions);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 20;
    controls.maxDistance = 400;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.12;
    controls.enablePan = false;

    // Parallax effect on scroll
    let scrollY = window.scrollY;
    const onScroll = () => {
      const newScrollY = window.scrollY;
      const delta = (newScrollY - scrollY) * 0.002;
      nodes.rotation.x += delta;
      if (connections) connections.rotation.x += delta;
      scrollY = newScrollY;
    };
    window.addEventListener('scroll', onScroll);

    // Animation Loop: morph shape and animate color
    let morphTime = 0;
    let morphDir = 1;
    const animate = () => {
      morphTime += 0.008 * morphDir;
      if (morphTime > 1 || morphTime < 0) {
        morphDir *= -1;
        morphTime = THREE.MathUtils.clamp(morphTime, 0, 1);
        // New morph targets for next morph
        for (let i = 0; i < NODE_COUNT; i++) {
          morphTargets[i].set(
            THREE.MathUtils.randFloatSpread(NETWORK_WIDTH),
            THREE.MathUtils.randFloatSpread(NETWORK_WIDTH * 0.5),
            THREE.MathUtils.randFloatSpread(NETWORK_WIDTH * 0.5)
          );
        }
      }
      // Interpolate node positions
      for (let i = 0; i < NODE_COUNT; i++) {
        nodesArray[i].lerpVectors(basePositions[i], morphTargets[i], morphTime);
        nodePositions[i * 3] = nodesArray[i].x;
        nodePositions[i * 3 + 1] = nodesArray[i].y;
        nodePositions[i * 3 + 2] = nodesArray[i].z;
      }
      nodeGeometry.attributes.position.needsUpdate = true;

      // Animate node colors (hue shift)
      const colorShift = (Math.sin(Date.now() * 0.0002) + 1) * 0.15;
      for (let i = 0; i < NODE_COUNT; i++) {
        const baseColor = new THREE.Color(palette[i % palette.length]);
        baseColor.offsetHSL(colorShift, 0, 0);
        nodeGeometry.attributes.color.setXYZ(i, baseColor.r, baseColor.g, baseColor.b);
      }
      nodeGeometry.attributes.color.needsUpdate = true;

      // Animate connections (rebuild for new positions/colors)
      updateConnections(nodePositions, colorShift);

      starField.rotation.y += 0.0003;
      nodes.rotation.y += 0.001;
      if (connections) connections.rotation.y += 0.001;
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