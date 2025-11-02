import React, { useState } from 'react';
import { musicData } from './musicData'; // Import our fake data

// We pass a function `onGenerate` from App.js
// This tells the parent component (App.js) when the user clicks the button
function Screen1_SparkForm({ onGenerate }) {
  // Use React's "state" to keep track of what the user selects
  const [selectedGenre, setSelectedGenre] = useState(musicData.genres[0]);
  const [selectedMood, setSelectedMood] = useState(musicData.moods[0]);

  const handleSubmit = () => {
    // When the user clicks "Generate", we pass the selected options
    // up to the App.js component.
    onGenerate(selectedGenre, selectedMood);
  };

  return (
    <div className="screen">
      <h1>Let's make a new song idea!</h1>
      <p>=============================</p>

      <div className="form-group">
        <label>CHOOSE A GENRE</label>
        <select 
          value={selectedGenre} 
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          {musicData.genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>CHOOSE A MOOD</label>
        <select 
          value={selectedMood} 
          onChange={(e) => setSelectedMood(e.target.value)}
        >
          {musicData.moods.map(mood => (
            <option key={mood} value={mood}>{mood}</option>
          ))}
        </select>
      </div>
      
      <p className="ai-note">(Our AI will pick the best key for you)</p>

      <button className="cta-button" onClick={handleSubmit}>
        FIND CHORD IDEAS
      </button>
    </div>
  );
}

export default Screen1_SparkForm;