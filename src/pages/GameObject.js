import React, { useState } from 'react';
import ThreeDEnvironment from './ThreeDEnvironment';
import Header from '../components/Header';
import '../styles/GameObject.css';

<Header />  

const GameObject = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const startGame = (selectedLevel) => {
    setLevel(selectedLevel);
    setIsPlaying(true);
    setScore(0);
  };

  const handleTargetClick = () => {
    setScore(score + 1);
  };

  return (
    <div className="game-object-container">
      <header className="game-header">
        <h1>GameObject</h1>

        <p>Mejora tu concentración y tiempo de reacción en un espacio 3D.</p>

      </header>

      {!isPlaying && (
        <div className="level-selector">
          <h2>Selecciona un nivel</h2>
          <div className="level-buttons">
            <button onClick={() => startGame(1)} className="level-button level-1">
              Nivel 1: Principiante
            </button>
            <button onClick={() => startGame(2)} className="level-button level-2">
              Nivel 2: Intermedio
            </button>
            <button onClick={() => startGame(3)} className="level-button level-3">
              Nivel 3: Avanzado
            </button>
          </div>
        </div>
      )}

      {isPlaying && (
        <div className="game-screen">
          <div className="score-display">
            <span>Puntuación: {score}</span>
            <span>Nivel: {level}</span>
          </div>
          <ThreeDEnvironment level={level} onTargetClick={handleTargetClick} />
          <button onClick={() => setIsPlaying(false)} className="quit-button">
            Salir
          </button>
        </div>
      )}

      <footer className="game-footer">
        <p>© 2025 GameObject.</p>
      </footer>
    </div>
  );
};

export default GameObject;