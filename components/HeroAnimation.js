import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HeroAnimation = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Your existing animation code...
    // (Keep the rest of the HeroAnimation.js code you have)
    
    return () => {
      // Cleanup code...
    };
  }, []);

  return <div ref={mountRef} className="hero-animation" />;
};

export default HeroAnimation;