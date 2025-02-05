import React from 'react';
import { useRouter } from 'next/router';
import Button from '../components/Button';
import '../styles/HomePage.css';

const HomePage = () => {
  const router = useRouter();

  return (
    <div className="home-page">
      <div className="login-container">
        <Button
          text="Login"
          onClick={() => router.push('/login')}  // Redirige a /login
          className="btn-login"
        />
      </div>

      <h1 className="title-home">M I N D F U L N E S S</h1>
      <p className="subtitle">Switch off the noises, tune into yourself</p>

      <div className="options">
        <div
          className="card"
          onClick={() => router.push('/FocusPage')}  // Redirige a /focus
          aria-label="Go to Focus Game"
        >
          <div className="card-inner">
            <div className="card-front">Focus Game</div>
            <div className="card-back">¡Mejora tu concentración!</div>
          </div>
        </div>
        <div
          className="card"
          onClick={() => router.push('/VisualizationPage')}  // Redirige a /visualization
          aria-label="Go to Dynamic Visualizations"
        >
          <div className="card-inner">
            <div className="card-front">Dynamic Visualizations</div>
            <div className="card-back">Explora visualizaciones relajantes.</div>
          </div>
        </div>
        <div
          className="card"
          onClick={() => router.push('/BreathingPage')}  // Redirige a /breathing
          aria-label="Go to Breathing Exercise"
        >
          <div className="card-inner">
            <div className="card-front">Breathing Exercise</div>
            <div className="card-back">Practica técnicas de respiración.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
