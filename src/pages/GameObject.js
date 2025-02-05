import React, { useState } from 'react';
import MindfulnessGame from './MindfulnessGame'; // Importa el componente del juego con Three.js
import Header from '../components/Header';
import '../styles/GameObject.css';
import * as THREE from 'three';


const GameObject = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Inicia el juego estableciendo el nivel seleccionado, reiniciando la puntuación y cambiando el estado
  const startGame = (selectedLevel) => {
    setLevel(selectedLevel);
    setIsPlaying(true);
    setScore(0);
  };

  // Cada vez que se haga clic en la bola diferente se incrementa la puntuación
  const handleOddBallClick = () => {
    setScore((prevScore) => prevScore + 1);
  };

  return (
    <div className="game-object-container">
      <Header />
      <header className="game-header">
        <h1>GameObject</h1>
        <p>Mejora tu concentración y tiempo de reacción en un espacio 3D.</p>
      </header>

      {/* Si el juego no ha iniciado, se muestra el selector de nivel */}
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

      {/* Una vez iniciado el juego, se muestra la pantalla del juego */}
      {isPlaying && (
        <div className="game-screen">
          <div className="score-display">
            <span>Puntuación: {score}</span>
            <span>Nivel: {level}</span>
          </div>
          {/* Se utiliza el componente MindfulnessGame, pasando el nivel y la función de callback */}
          <MindfulnessGame level={level} onOddBallClick={handleOddBallClick} />
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
