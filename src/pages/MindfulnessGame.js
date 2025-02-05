import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const MindfulnessGame = ({ level, onOddBallClick }) => {
  const mountRef = useRef(null);
  const scene = useRef(new THREE.Scene());
  const camera = useRef(null);
  const renderer = useRef(null);
  const targets = useRef([]); // Array que contendrá las bolas
  const raycaster = useRef(new THREE.Raycaster());
  const animationFrameId = useRef();

  // Inicializa Three.js: cámara, renderer e iluminación
  const initThree = () => {
    if (!mountRef.current) return;

    // Configurar cámara
    camera.current = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    // Ubicar la cámara para ver toda la cuadrícula
    camera.current.position.z = 20;

    // Configurar renderer
    renderer.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.current.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    // Fondo transparente para un entorno "mindfulness"
    renderer.current.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.current.domElement);

    // Añadir iluminación ambiental (luz suave)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.current.add(ambientLight);

    // Luz puntual para realzar los volúmenes
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(10, 10, 10);
    scene.current.add(pointLight);
  };

  // Crea la cuadrícula de bolas; una de ellas tendrá un color ligeramente distinto
  const createGrid = () => {
    // Elimina las bolas anteriores
    targets.current.forEach(target => scene.current.remove(target));
    targets.current = [];

    // Definir dimensiones de la cuadrícula:
    // Por ejemplo: nivel 1 → 4x4, nivel 2 → 5x5, nivel 3 → 6x6
    const gridSize = level + 3;
    const spacing = 3;
    const offset = ((gridSize - 1) * spacing) / 2;

    // Configurar colores usando HSL para facilitar el ajuste de tonalidades
    const baseColor = new THREE.Color();
    baseColor.setHSL(0.55, 0.5, 0.5); // Color base (un azul calmado)
    // La diferencia de luminosidad dependerá del nivel:
    // Fácil: diferencia notable, Difícil: diferencia sutil
    const delta = level === 1 ? 0.15 : level === 2 ? 0.10 : 0.05;
    const oddColor = new THREE.Color();
    oddColor.setHSL(0.55, 0.5, 0.5 + delta);

    // Seleccionar aleatoriamente cuál bola será la "diferente"
    const totalBalls = gridSize * gridSize;
    const oddIndex = Math.floor(Math.random() * totalBalls);

    // Reutilizar la misma geometría para todas las bolas
    const geometry = new THREE.SphereGeometry(1, 32, 32);

    // Crear la cuadrícula de bolas
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const index = row * gridSize + col;
        // Seleccionar el color de la bola: si es la elegida, se usa oddColor
        const materialColor = index === oddIndex ? oddColor : baseColor;
        const material = new THREE.MeshPhongMaterial({ color: materialColor });
        const sphere = new THREE.Mesh(geometry, material);

        // Posicionar la bola para centrar la cuadrícula
        sphere.position.x = col * spacing - offset;
        sphere.position.y = row * spacing - offset;
        sphere.position.z = 0;

        // Marcar la bola "diferente" para identificarla luego en el click
        sphere.userData.isOdd = index === oddIndex;

        // Agregar la bola a la escena y al array de targets
        scene.current.add(sphere);
        targets.current.push(sphere);
      }
    }
  };

  // Bucle de animación (puedes agregar animaciones suaves para generar un ambiente relajado)
  const animate = () => {
    if (!mountRef.current || !renderer.current) return;
    animationFrameId.current = requestAnimationFrame(animate);
    renderer.current.render(scene.current, camera.current);
  };

  // Manejar clics para detectar cuál bola se ha seleccionado
  const handleClick = (event) => {
    if (!mountRef.current || !camera.current) return;

    const mouse = new THREE.Vector2();
    const rect = mountRef.current.getBoundingClientRect();
    // Coordenadas normalizadas de -1 a +1
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.current.setFromCamera(mouse, camera.current);
    const intersects = raycaster.current.intersectObjects(targets.current);

    if (intersects.length > 0) {
      const clickedSphere = intersects[0].object;
      if (clickedSphere.userData.isOdd) {
        // Si se clickea la bola diferente, se dispara la función callback
        onOddBallClick && onOddBallClick();
        // Opcional: regenerar la cuadrícula para el siguiente desafío
        createGrid();
      }
    }
  };

  useEffect(() => {
    initThree();
    createGrid();
    animate();
    window.addEventListener('click', handleClick);

    // Manejar redimensionamiento de la ventana
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

    // Limpieza: remover listeners, cancelar animación y eliminar renderer
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

  return <div ref={mountRef} className="three-d-game" style={{ width: '100%', height: '100%' }} />;
};

export default MindfulnessGame;
