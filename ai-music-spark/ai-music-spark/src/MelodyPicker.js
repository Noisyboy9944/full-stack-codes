import React from 'react';

// We receive two props from App.js:
// 1. `ideas`: The array of melody objects (e.g., [{id: 1, name: "Chill Piano..."}, ...])
// 2. `onSelect`: The function to call when the user clicks "SELECT"

function MelodyPicker({ ideas, onSelect }) {

  const handleListen = (idea) => {
    // For now, we'll just show an alert.
    // In a real app, this would play the melody + the chords.
    alert(`Listening to: ${idea.name}`);
  };

  return (
    <div className="screen">
      <h1>Here are your new song ideas!</h1>
      <p>(Tap to listen to the full idea)</p>

      <div className="card-list">
        {ideas.map((idea) => (
          <div className="card" key={idea.id}>
            <div className="card-content">
              {/* We just display the name of the melody */}
              <strong>{idea.name}</strong>
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
      
      {/* We could add a "Regenerate" button here later */}

    </div>
  );
}

export default MelodyPicker;
