import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Button from '../components/Button';
import '../styles/VisualizationPage.css';
import '../styles/global.css';

const VisualizationPage = () => {
  return (
    <div className="visualization-page-container">
      <Header logo="/logo.png" links={[]} />
      
      <main className="text-center">
        <h2 className="titles-games">DYNAMIC VISUALITZACION</h2>

        <p className="subtitles-games">Select a calming visual pattern:</p>

        <div className="cards-horizontal-container">
          <div className="game-card">
            <h3 className="names">Water Waves</h3>
            <p className="description">Relax with the soothing motion of water waves.</p>
            <Button 
              text="Start Water Waves" 
              onClick={() => alert('Water Waves started!')}
              className="holographic-btn"
            />
          </div>

          <div className="game-card">
            <h3 className="names">Northern Lights</h3>
            <p className="description">Experience the mesmerizing colors of the aurora borealis.</p>
            <Button 
              text="Start Northern Lights" 
              onClick={() => alert('Northern Lights started!')}
              className="holographic-btn"
            />
          </div>
        </div>

        <Button 
          text="Select Music" 
          onClick={() => alert('Music selected!')}
          className="holographic-btn"
        />
      </main>
    </div>
  );
};

export default VisualizationPage;
