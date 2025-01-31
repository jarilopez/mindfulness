import React, { useEffect } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Link from 'next/link'; 
import '../styles/FocusPage.css';
import '../styles/global.css';


const FocusPage = () => {

  return (
    <div className="focus-page">
      <div className="gradient-canvas"></div>
      <div className="particle-network"></div>
      
      <Header />
      <main className="text-center">
        <h2 className='focus-title'>
          <span className="neon-cyber">FOCUS CHALLENGE</span>
        </h2>
        <h3 className='focus-subtitle'>Select your cognitive training</h3>

        <div className="cards-horizontal-container">
          <div className="card-wrapper">
            <div className="game-card blue-card">
              <div className="card-glow"></div>
              <h3 className='game-name'>The Object</h3>
              <p className='game-description'>
                Improve visual tracking and reaction time with dynamic targets in 3D space.
              </p>

              <div className="button-container">
                <Link href="/GameObject"> 
                  <Button 
                    text="Start Training" 
                    className="holographic-btn"
                  />
                </Link>
              </div>

            </div>
          </div>

          <div className="card-wrapper">
            <div className="game-card blue-card">
              <div className="card-glow"></div>
              <h3 className='game-name'>The Shapes</h3>
              <p className='game-description'>
                Master spatial recognition with evolving geometric patterns.
              </p>
              
              <div className="button-container">
                <Link href="/game-shapes"> 
                  <Button 
                    text="Start Training"
                    className="holographic-btn"
                  />
                </Link>
              </div>


            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FocusPage;