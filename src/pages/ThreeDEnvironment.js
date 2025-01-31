import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeDEnvironment = ({ level, onTargetClick }) => {
  const mountRef = useRef(null);
  const scene = useRef(new THREE.Scene());
  const camera = useRef(null);
  const renderer = useRef(null);
  const targets = useRef([]);
  const raycaster = useRef(new THREE.Raycaster());
  const animationFrameId = useRef();

  // Configuración inicial del renderer
  const initThree = () => {
    if (!mountRef.current) return;

    // 1. Configurar cámara
    camera.current = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.current.position.z = 15;

    // 2. Configurar renderer
    renderer.current = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.current.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.current.setClearColor(0x000000, 0); // Fondo transparente
    mountRef.current.appendChild(renderer.current.domElement);

    // 3. Configurar iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.current.add(ambientLight);

    const pointLight = new THREE.PointLight(0x4facfe, 1);
    pointLight.position.set(5, 5, 5);
    scene.current.add(pointLight);
  };

  // Creación de objetivos
  const createTargets = () => {
    // Limpiar objetivos anteriores
    targets.current.forEach(target => scene.current.remove(target));
    targets.current = [];

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      shininess: 100,
    });

    // Crear nuevos objetivos
    for (let i = 0; i < 5 + level * 3; i++) {
      const target = new THREE.Mesh(geometry, material);
      target.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 20
      );
      scene.current.add(target);
      targets.current.push(target);
    }
  };

  // Animación principal
  const animate = () => {
    if (!mountRef.current || !renderer.current) return;

    animationFrameId.current = requestAnimationFrame(animate);

    // Actualizar posición de objetivos
    targets.current.forEach((target, index) => {
      target.rotation.x += 0.01;
      target.rotation.y += 0.01;
      target.position.y = Math.sin(Date.now() * 0.001 + index) * 2;
    });

    renderer.current.render(scene.current, camera.current);
  };

  // Manejador de clics
  const handleClick = (event) => {
    if (!mountRef.current || !camera.current) return;

    const mouse = new THREE.Vector2();
    const rect = mountRef.current.getBoundingClientRect();
    
    // Coordenadas normalizadas (-1 a +1)
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.current.setFromCamera(mouse, camera.current);
    const intersects = raycaster.current.intersectObjects(targets.current);

    if (intersects.length > 0) {
      onTargetClick();
      scene.current.remove(intersects[0].object);
      targets.current = targets.current.filter(t => t !== intersects[0].object);
    }
  };

  useEffect(() => {
    initThree();
    createTargets();
    animate();
    window.addEventListener('click', handleClick);

    // Manejar resize de ventana
    const handleResize = () => {
      if (mountRef.current && camera.current && renderer.current) {
        camera.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.current.updateProjectionMatrix();
        renderer.current.setSize(
          mountRef.current.clientWidth,
          mountRef.current.clientHeight
        );
      }
    };
    
    window.addEventListener('resize', handleResize);

    // Limpieza
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId.current);

      if (renderer.current) {
        renderer.current.dispose();
        if (mountRef.current && renderer.current.domElement) {
          mountRef.current.removeChild(renderer.current.domElement);
        }
      }
    };
  }, [level]);

  return <div ref={mountRef} className="three-d-environment" />;
};

export default ThreeDEnvironment;