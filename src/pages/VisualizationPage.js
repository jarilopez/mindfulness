// pages/visualization.js
import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Button from '../components/Button';
import '../styles/VisualizationPage.css';
import '../styles/global.css';

const VisualizationPage = () => {
  return (
    <div className="visualization-page">
      <Header logo="/logo.png" links={[]} />
      
      <main className="text-center">
        <h2 className='titles-games'>Dynamic Visualizations</h2>

        <p>Select a calming visual pattern:</p>

        <div className="visualization-options">
          <Button 
            text="Water Waves" 
            onClick={() => alert('Water Waves started!')}
            className="button"
          />
          
          <Button 
            text="Northern Lights" 
            onClick={() => alert('Northern Lights started!')}
            className="button"
          />
        </div>

        <Button 
          text="Select Music" 
          onClick={() => alert('Music selected!')}
          className="button"
        />

        {/* Enlace de navegación a otra página, ejemplo: Inicio */}
        <div className="navigation-links">
          <Link href="/">
            <Button text="Go to Home" className="button" />
          </Link>

          <Link href="/meditation">
            <Button text="Meditation Page" className="button" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default VisualizationPage;
