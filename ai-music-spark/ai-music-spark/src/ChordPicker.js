import React from 'react';

// We receive two props from App.js:
// 1. `ideas`: The array of chord progressions (e.g., [{key: "C", chords: "C-G-Am-F"}, ...])
// 2. `onSelect`: The function to call when the user clicks "SELECT"

function Screen2_ChordPicker({ ideas, onSelect }) {

  const handleListen = (idea) => {
    // For now, we'll just show an alert.
    // In a real app, this would play a sound.
    alert(`Listening to: ${idea.chords}`);
  };

  return (
    <div className="screen">
      <h1>Here are a few ideas...</h1>
      <p>(Tap to listen, then select your favorite)</p>

      <div className="card-list">
        {ideas.map((idea, index) => (
          <div className="card" key={index}>
            <div className="card-content">
              <strong>Idea {index + 1}</strong>
              <p>{idea.chords} <span>({idea.key})</span></p>
            </div>
            <div className="card-actions">
              <button className="listen-button" onClick={() => handleListen(idea)}>
                LISTEN
              </button>
              <button className="select-button" onClick={() => onSelect(idea)}>
                SELECT
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* We can add a "Regenerate" button here later */}
      
    </div>
  );
}

export default Screen2_ChordPicker;