import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Sphere, Ring, Environment } from '@react-three/drei';
import { useState, useRef } from 'react';
import * as THREE from 'three';
import React from 'react';
import Header from '../components/Header';
import '../styles/BreathingPage.css';

const BreathingPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState(null);

  const techniques = [
    {
      id: '4-7-8',
      name: '4-7-8 Breathing',
      description: 'Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds',
      color: '#5a8a6a' 
    },
    {
      id: 'box',
      name: 'Box Breathing',
      description: 'Equal phases: inhale, hold, exhale, hold (4 seconds each)',
      color: '#2e5842' 
    }
  ];

  return (
    <div className={`breath-page ${isActive ? 'breath-page--active' : ''}`}>
      <Header />
      <div className="breath-content">
        <h1 className="breath-title">Breathing Exercises</h1>
        {!selectedTechnique ? (
          <div className="breath-techniques">
            <h2 className="breath-subtitle">Select a breathing technique:</h2>
            <div className="technique-cards">
              {techniques.map((tech) => (
                <div
                  key={tech.id}
                  className="technique-card"
                  onClick={() => setSelectedTechnique(tech)}
                >
                  <h3>{tech.name}</h3>
                  <p>{tech.description}</p>
                  <div className="glow" style={{ backgroundColor: tech.color }} />
                  <button
                    className="start-btn holographic-breath-btn"
                    style={{ '--button-color': tech.color }}
                  >
                    Start
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <BreathingSession
            technique={selectedTechnique}
            isActive={isActive}
            setIsActive={setIsActive}
            onBack={() => setSelectedTechnique(null)}
          />
        )}
      </div>
    </div>
  );
};

// 🎨 **Sesión de respiración con efectos especiales**
const BreathingSession = ({ technique, isActive, setIsActive, onBack }) => {
  return (
    <div className="breath-session">
      <Canvas>
        <Environment preset="forest" />
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} />
        <BreathSphere technique={technique} />
      </Canvas>

      <div className="breath-instructions">
        <button
          className="start-btn holographic-breath-btn"
          style={{ '--button-color': technique.color }}
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? 'PAUSE' : 'START'}
        </button>

        <button className="back-btn holographic-breath-btn" onClick={onBack}>
          ← Back to techniques
        </button>
      </div>
    </div>
  );
};

// 🌿 **Esfera de respiración con borde animado y verdes mejorados**
const BreathSphere = ({ technique }) => {
  const [phase, setPhase] = useState('Inhale');
  const [scale, setScale] = useState(1);
  const [seconds, setSeconds] = useState(4);
  const phaseRef = useRef('Inhale');
  const ringRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const cycle = time % 19; 
    let progress = cycle / 19; // 0 (inicio) → 1 (final)

    if (cycle < 4) {
      phaseRef.current = 'Inhale';
      setPhase('Inhale');
      setScale(1 + (cycle / 4) * 0.5);
      setSeconds(Math.ceil(4 - cycle));
    } else if (cycle < 11) {
      phaseRef.current = 'Hold';
      setPhase('Hold');
      setScale(1.5);
      setSeconds(Math.ceil(11 - cycle));
    } else {
      phaseRef.current = 'Exhale';
      setPhase('Exhale');
      setScale(1.5 - ((cycle - 11) / 8) * 0.5);
      setSeconds(Math.ceil(19 - cycle));
    }

    // Rotar la circunferencia animada
    if (ringRef.current) {
      ringRef.current.scale.set(progress + 0.1, progress + 0.1, 1);
    }
  });

  return (
    <>
      {/* Circunferencia animada que se llena con el tiempo */}
      <Ring ref={ringRef} args={[1.5, 1.55, 64, 1, 0, 0]} position={[0, 0, 0]}>
  <meshStandardMaterial color="#4CAF50" emissive="#2e7d32" emissiveIntensity={0.5} side={THREE.DoubleSide} />
</Ring>

      {/* Esfera de respiración en verdes */}
      <Sphere args={[1, 64, 64]} scale={scale}>
    <meshStandardMaterial 
      color={phase === 'Inhale' ? '#4CAF50' : '#1B5E20'} 
      roughness={0.3} 
      metalness={0.2} 
    />
    <Html center>
      <div className="breath-instruction">
        {phase} - {seconds}s
      </div>
    </Html>
  </Sphere>
    </>
  );
};

export default BreathingPage;
