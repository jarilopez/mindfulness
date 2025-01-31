// BreathingPage.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import '../styles/BreathingPage.css';



const BreathingPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);

  const techniques = [
    {
      id: '4-7-8',
      name: '4-7-8 Breathing',
      description: 'Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds',
      color: '#72FCEB'
    },
    {
      id: 'box',
      name: 'Box Breathing',
      description: 'Equal phases: inhale, hold, exhale, hold (4 seconds each)',
      color: '#6DD3F5'
    }
  ];

  const durations = [3, 6, 10];

  return (
    <div className={`breath-page ${isActive ? 'breath-page--active' : ''}`}>
      <div className="breath-content">
        <h1 className="breath-title">Breathing Exercises</h1>
        
        {!selectedTechnique && (
          <div className="breath-techniques">
            <h2>Select a breathing technique:</h2>
            <div className="technique-cards">
              {techniques.map((tech) => (
                <div
                  key={tech.id}
                  className="technique-card"
                  style={{ borderColor: tech.color }}
                  onClick={() => setSelectedTechnique(tech)}
                >
                  <h3>{tech.name}</h3>
                  <p>{tech.description}</p>
                  <div className="glow" style={{ backgroundColor: tech.color }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTechnique && !selectedDuration && (
          <div className="breath-durations">
            <h2>Select session duration:</h2>
            <div className="duration-buttons">
              {durations.map((duration) => (
                <button
                  key={duration}
                  className="duration-btn"
                  style={{
                    backgroundColor: selectedTechnique.color,
                    '--hover-color': `${selectedTechnique.color}80`
                  }}
                  onClick={() => setSelectedDuration(duration)}
                >
                  {duration} min
                </button>
              ))}
            </div>
            <button 
              className="back-btn"
              onClick={() => setSelectedTechnique(null)}
            >
              ← Back to techniques
            </button>
          </div>
        )}

        {selectedTechnique && selectedDuration && (
          <div className="breath-session">
            <div className="breath-animation">
              <div 
                className="breath-circle"
                style={{ borderColor: selectedTechnique.color }}
              >
                <div className="breath-glow" />
              </div>
              <div className="breath-instruction">
                {isActive ? 'Breathe...' : 'Ready to start'}
              </div>
            </div>
            
            <button
              className="start-btn"
              style={{ backgroundColor: selectedTechnique.color }}
              onClick={() => setIsActive(!isActive)}
            >
              {isActive ? 'PAUSE' : 'START'}
            </button>

            <button 
              className="back-btn"
              onClick={() => setSelectedDuration(null)}
            >
              ← Change duration
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


export default BreathingPage;
