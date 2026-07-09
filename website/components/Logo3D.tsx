'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Logo3DProps {
  size: number;
}

export default function Logo3D({ size }: Logo3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    const width = size;
    const height = size;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 3.6;

    // Renderer with transparency
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Geometry - Box (Square)
    const geometry = new THREE.BoxGeometry(1.6, 1.6, 1.6);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/logo.png');

    // Materials - map texture to all 6 faces of the cube
    const materials = Array(6).fill(
      new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.1,
        metalness: 0.2,
        side: THREE.DoubleSide
      })
    );

    // Mesh
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight2.position.set(-5, -5, 2);
    scene.add(directionalLight2);

    // Set beautiful static isometric angle to show 3D depth
    cube.rotation.y = 0.55;
    cube.rotation.x = 0.35;

    // Render once (no CPU loop or mouse move listeners)
    renderer.render(scene, camera);

    // Cleanup
    return () => {
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      materials.forEach((m) => m.dispose());
      texture.dispose();
      renderer.dispose();
    };
  }, [size]);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: `${size}px`, 
        height: `${size}px`, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        cursor: 'grab',
        filter: 'drop-shadow(4px 4px 0px #0f172a)'
      }} 
    />
  );
}
