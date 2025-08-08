import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Enhanced color palette matching our teal/purple theme
const palette = [
  0x14b8a6, // Main teal
  0x8b5cf6, // Rich purple
  0x06b6d4, // Cyan
  0xf59e0b, // Golden yellow
  0x10b981, // Emerald
  0x22d3ee, // Light cyan
  0xa78bfa, // Light purple
  0x2dd4bf, // Light teal
  0x7c3aed, // Dark purple
  0x0f766e  // Dark teal
];

const NODE_COUNT = window.innerWidth < 768 ? 30 : 50; // Reduced for mobile
const NEIGHBOR_COUNT = window.innerWidth < 768 ? 3 : 4; // Fewer connections on mobile
const NETWORK_WIDTH = window.innerWidth < 768 ? 250 : 350; // Smaller network on mobile
const PARTICLE_COUNT = window.innerWidth < 768 ? 100 : 200; // Fewer particles on mobile

const NeuralNetworkBackground = () => {
  const mountRef = useRef();

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1a1625, 0.0008); // Match our theme background

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    camera.position.set(0, 5, 150);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true, 
      powerPreference: "high-performance" 
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x1a1625, 0.95); // Match our theme
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced Starfield with depth and twinkling
    function createStarfield() {
      const count = 8000;
      const positions = [];
      const colors = [];
      const sizes = [];
      
      for (let i = 0; i < count; i++) {
        const r = THREE.MathUtils.randFloat(NETWORK_WIDTH * 1.5, NETWORK_WIDTH * 3);
        const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
        const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
        
        positions.push(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        );
        
        // Varied star colors - teal to purple spectrum
        const color = new THREE.Color(palette[Math.floor(Math.random() * palette.length)]);
        colors.push(color.r, color.g, color.b);
        
        // Varied star sizes
        sizes.push(THREE.MathUtils.randFloat(0.1, 0.3));
      }
      
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
      
      const material = new THREE.PointsMaterial({
        vertexColors: true,
        sizeAttenuation: true,
        depthWrite: false,
        opacity: 0.6,
        transparent: true,
        blending: THREE.AdditiveBlending
      });
      
      return new THREE.Points(geometry, material);
    }
    const starField = createStarfield();
    scene.add(starField);

    // Enhanced Neural Network with glowing nodes
    const basePositions = [];
    const morphTargets = [];
    const nodeColors = [];
    const nodeSizes = [];
    const nodesArray = [];
    const nodeVelocities = [];
    
    for (let i = 0; i < NODE_COUNT; i++) {
      const pos = new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(NETWORK_WIDTH),
        THREE.MathUtils.randFloatSpread(NETWORK_WIDTH * 0.6),
        THREE.MathUtils.randFloatSpread(NETWORK_WIDTH * 0.6)
      );
      basePositions.push(pos);
      morphTargets.push(new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(NETWORK_WIDTH),
        THREE.MathUtils.randFloatSpread(NETWORK_WIDTH * 0.6),
        THREE.MathUtils.randFloatSpread(NETWORK_WIDTH * 0.6)
      ));
      
      // Enhanced color system
      const color = new THREE.Color(palette[Math.floor(Math.random() * palette.length)]);
      nodeColors.push(color.r, color.g, color.b);
      
      // Varied node sizes for hierarchy
      nodeSizes.push(THREE.MathUtils.randFloat(1.2, 2.8));
      
      nodesArray.push(pos.clone());
      
      // Add subtle velocity for organic movement
      nodeVelocities.push(new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(0.02),
        THREE.MathUtils.randFloatSpread(0.02),
        THREE.MathUtils.randFloatSpread(0.02)
      ));
    }

    // Enhanced node geometry with glow effect
    const nodeGeometry = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      nodePositions[i * 3] = basePositions[i].x;
      nodePositions[i * 3 + 1] = basePositions[i].y;
      nodePositions[i * 3 + 2] = basePositions[i].z;
    }
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    nodeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(nodeColors, 3));
    nodeGeometry.setAttribute('size', new THREE.Float32BufferAttribute(nodeSizes, 1));
    
    const nodeMaterial = new THREE.PointsMaterial({
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const nodes = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodes);

    // Flowing Particles System
    const particlePositions = [];
    const particleColors = [];
    const particleSizes = [];
    const particleVelocities = [];
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Random positions within network bounds
      particlePositions.push(
        THREE.MathUtils.randFloatSpread(NETWORK_WIDTH * 1.2),
        THREE.MathUtils.randFloatSpread(NETWORK_WIDTH * 0.8),
        THREE.MathUtils.randFloatSpread(NETWORK_WIDTH * 0.8)
      );
      
      // Particle colors from palette
      const color = new THREE.Color(palette[Math.floor(Math.random() * palette.length)]);
      particleColors.push(color.r, color.g, color.b);
      
      // Small particle sizes
      particleSizes.push(THREE.MathUtils.randFloat(0.3, 0.8));
      
      // Random velocities for organic flow
      particleVelocities.push(
        THREE.MathUtils.randFloatSpread(0.5),
        THREE.MathUtils.randFloatSpread(0.3),
        THREE.MathUtils.randFloatSpread(0.3)
      );
    }
    
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));
    particleGeometry.setAttribute('size', new THREE.Float32BufferAttribute(particleSizes, 1));
    
    const particleMaterial = new THREE.PointsMaterial({
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Enhanced Connections with pulse effects
    let connectionPositions = [];
    let connectionColors = [];
    let connectionOpacities = [];
    let connectionGeometry, connections;

    function updateConnections(currentPositions, colorShift = 0, time = 0) {
      connectionPositions = [];
      connectionColors = [];
      connectionOpacities = [];
      
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
        for (let k = 0; k < NEIGHBOR_COUNT && k < dists.length; k++) {
          const j = dists[k].j;
          if (i < j) { // Avoid duplicate connections
            connectionPositions.push(
              currentPositions[i * 3], currentPositions[i * 3 + 1], currentPositions[i * 3 + 2],
              currentPositions[j * 3], currentPositions[j * 3 + 1], currentPositions[j * 3 + 2]
            );
            
            // Enhanced color mixing with pulse effect
            const baseColor1 = new THREE.Color(nodeColors[i * 3], nodeColors[i * 3 + 1], nodeColors[i * 3 + 2]);
            const baseColor2 = new THREE.Color(nodeColors[j * 3], nodeColors[j * 3 + 1], nodeColors[j * 3 + 2]);
            
            // Add time-based hue shifting and pulsing
            const pulsePhase = (time + i * 0.1 + j * 0.1) % (Math.PI * 2);
            const pulse = (Math.sin(pulsePhase) + 1) * 0.3 + 0.4;
            
            baseColor1.offsetHSL(colorShift, 0, pulse * 0.2);
            baseColor2.offsetHSL(colorShift, 0, pulse * 0.2);
            
            connectionColors.push(baseColor1.r, baseColor1.g, baseColor1.b);
            connectionColors.push(baseColor2.r, baseColor2.g, baseColor2.b);
            
            // Distance-based opacity with pulse
            const maxDist = NETWORK_WIDTH * 0.3;
            const opacity = Math.max(0, (maxDist - dists[k].dist) / maxDist) * pulse;
            connectionOpacities.push(opacity, opacity);
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
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      
      connections = new THREE.LineSegments(connectionGeometry, connectionMaterial);
      scene.add(connections);
    }

    updateConnections(nodePositions);

    // Enhanced Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;
    controls.rotateSpeed = 0.3;
    controls.minDistance = 50;
    controls.maxDistance = 500;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.08;
    controls.enablePan = false;
    controls.enableZoom = false; // Disable zoom for background

    // Enhanced parallax effect on scroll
    let scrollY = window.scrollY;
    const onScroll = () => {
      const newScrollY = window.scrollY;
      const delta = (newScrollY - scrollY) * 0.001;
      nodes.rotation.x += delta * 0.5;
      particles.rotation.x += delta * 0.3;
      if (connections) connections.rotation.x += delta * 0.5;
      scrollY = newScrollY;
    };
    window.addEventListener('scroll', onScroll);

    // Enhanced Animation Loop with multiple effects
    let morphTime = 0;
    let morphDir = 1;
    let globalTime = 0;
    
    const animate = () => {
      globalTime += 0.016; // ~60fps timing
      
      // Enhanced morphing with smoother transitions
      morphTime += 0.005 * morphDir;
      if (morphTime > 1 || morphTime < 0) {
        morphDir *= -1;
        morphTime = THREE.MathUtils.clamp(morphTime, 0, 1);
        
        // Generate new morph targets with constraints
        for (let i = 0; i < NODE_COUNT; i++) {
          morphTargets[i].set(
            THREE.MathUtils.randFloatSpread(NETWORK_WIDTH * 0.8),
            THREE.MathUtils.randFloatSpread(NETWORK_WIDTH * 0.5),
            THREE.MathUtils.randFloatSpread(NETWORK_WIDTH * 0.5)
          );
        }
      }
      
      // Interpolate node positions with organic movement
      for (let i = 0; i < NODE_COUNT; i++) {
        // Apply velocity for organic drift
        basePositions[i].add(nodeVelocities[i]);
        
        // Boundary constraints with smooth bouncing
        if (Math.abs(basePositions[i].x) > NETWORK_WIDTH * 0.7) {
          nodeVelocities[i].x *= -0.8;
          basePositions[i].x = THREE.MathUtils.clamp(basePositions[i].x, -NETWORK_WIDTH * 0.7, NETWORK_WIDTH * 0.7);
        }
        if (Math.abs(basePositions[i].y) > NETWORK_WIDTH * 0.4) {
          nodeVelocities[i].y *= -0.8;
          basePositions[i].y = THREE.MathUtils.clamp(basePositions[i].y, -NETWORK_WIDTH * 0.4, NETWORK_WIDTH * 0.4);
        }
        if (Math.abs(basePositions[i].z) > NETWORK_WIDTH * 0.4) {
          nodeVelocities[i].z *= -0.8;
          basePositions[i].z = THREE.MathUtils.clamp(basePositions[i].z, -NETWORK_WIDTH * 0.4, NETWORK_WIDTH * 0.4);
        }
        
        // Smooth interpolation between positions
        nodesArray[i].lerpVectors(basePositions[i], morphTargets[i], morphTime);
        nodePositions[i * 3] = nodesArray[i].x;
        nodePositions[i * 3 + 1] = nodesArray[i].y;
        nodePositions[i * 3 + 2] = nodesArray[i].z;
      }
      nodeGeometry.attributes.position.needsUpdate = true;

      // Enhanced node color animation with breathing effect
      const colorShift = (Math.sin(globalTime * 0.0003) + 1) * 0.1;
      const breathe = (Math.sin(globalTime * 0.001) + 1) * 0.3 + 0.4;
      
      for (let i = 0; i < NODE_COUNT; i++) {
        const baseColor = new THREE.Color(palette[i % palette.length]);
        const personalPhase = globalTime * 0.0005 + i * 0.1;
        const personalShift = (Math.sin(personalPhase) + 1) * 0.05;
        
        baseColor.offsetHSL(colorShift + personalShift, 0, breathe * 0.2);
        nodeGeometry.attributes.color.setXYZ(i, baseColor.r, baseColor.g, baseColor.b);
        
        // Pulsing size effect
        const sizePulse = (Math.sin(personalPhase * 2) + 1) * 0.2 + 0.8;
        nodeGeometry.attributes.size.setX(i, nodeSizes[i] * sizePulse);
      }
      nodeGeometry.attributes.color.needsUpdate = true;
      nodeGeometry.attributes.size.needsUpdate = true;

      // Animate flowing particles
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        
        // Update particle positions
        positions[i3] += particleVelocities[i3];
        positions[i3 + 1] += particleVelocities[i3 + 1];
        positions[i3 + 2] += particleVelocities[i3 + 2];
        
        // Reset particles that drift too far
        if (Math.abs(positions[i3]) > NETWORK_WIDTH * 1.5) {
          positions[i3] = THREE.MathUtils.randFloatSpread(NETWORK_WIDTH);
          particleVelocities[i3] = THREE.MathUtils.randFloatSpread(0.5);
        }
        if (Math.abs(positions[i3 + 1]) > NETWORK_WIDTH) {
          positions[i3 + 1] = THREE.MathUtils.randFloatSpread(NETWORK_WIDTH * 0.8);
          particleVelocities[i3 + 1] = THREE.MathUtils.randFloatSpread(0.3);
        }
        if (Math.abs(positions[i3 + 2]) > NETWORK_WIDTH) {
          positions[i3 + 2] = THREE.MathUtils.randFloatSpread(NETWORK_WIDTH * 0.8);
          particleVelocities[i3 + 2] = THREE.MathUtils.randFloatSpread(0.3);
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Update connections with time-based effects
      updateConnections(nodePositions, colorShift, globalTime);

      // Enhanced rotation speeds
      starField.rotation.y += 0.0002;
      starField.rotation.x += 0.0001;
      
      nodes.rotation.y += 0.0008;
      particles.rotation.y += 0.0006;
      
      if (connections) {
        connections.rotation.y += 0.0008;
      }
      
      // Twinkling stars effect
      const starColors = starField.geometry.attributes.color.array;
      for (let i = 0; i < starColors.length; i += 3) {
        const twinkle = (Math.sin(globalTime * 0.001 + i * 0.01) + 1) * 0.3 + 0.4;
        const baseColor = new THREE.Color(palette[Math.floor((i / 3) % palette.length)]);
        starColors[i] = baseColor.r * twinkle;
        starColors[i + 1] = baseColor.g * twinkle;
        starColors[i + 2] = baseColor.b * twinkle;
      }
      starField.geometry.attributes.color.needsUpdate = true;
      
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