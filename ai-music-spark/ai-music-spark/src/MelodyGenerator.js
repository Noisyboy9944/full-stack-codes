import React, { useState } from 'react';

// We get props from App.js:
// 1. `progression`: The full {key, chords} object the user selected
// 2. `onGenerate`: The function to call when the user clicks the button

function Screen3_MelodyGenerator({ progression, onGenerate }) {
  // State for this screen's dropdowns
  const [sound, setSound] = useState('Piano');
  const [energy, setEnergy] = useState('Chill');

  // Our fake AI data for this screen
  const melodySounds = ['Piano', 'Bell', 'Synth', 'Voice'];
  const melodyEnergies = ['Chill', 'Simple', 'Busy'];

  const handleSubmit = () => {
    // Pass the new selections up to App.js
    onGenerate(sound, energy);
  };

  return (
    <div className="screen">
      <h1>Now, let's add a melody!</h1>
      <p>========================</p>

      {/* This new 'chord-summary' box shows the user's choice */}
      <div className="chord-summary">
        <label>YOUR CHORDS</label>
        <p>{progression.chords} <span>({progression.key})</span></p>
      </div>

      <div className="form-group">
        <label>PICK A MELODY SOUND</label>
        <select value={sound} onChange={(e) => setSound(e.target.value)}>
          {melodySounds.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>PICK THE MELODY'S ENERGY</label>
        <select value={energy} onChange={(e) => setEnergy(e.target.value)}>
          {melodyEnergies.map(e => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>
      </div>

      <button className="cta-button" onClick={handleSubmit}>
        FIND MELODY IDEAS
      </button>
    </div>
  );
}

export default Screen3_MelodyGenerator;