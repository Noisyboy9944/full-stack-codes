import React, { useState } from 'react';
import './App.css';
import SparkForm from './SparkForm';
import ChordPicker from './ChordPicker';
import MelodyGenerator from './MelodyGenerator'; 
import { musicData } from './musicData';

function App() {
  const [currentScreen, setCurrentScreen] = useState('screen1');
  const [chordIdeas, setChordIdeas] = useState([]);
  const [selectedProgression, setSelectedProgression] = useState(null);
  
  // eslint-disable-next-line no-unused-vars
  const [melodyIdeas, setMelodyIdeas] = useState([]);

  const handleGenerateChords = (genre, mood) => {
    const ideas = musicData.progressions[genre.toLowerCase()]?.[mood.toLowerCase()];
    if (ideas && ideas.length > 0) {
      setChordIdeas(ideas);
      setCurrentScreen('screen2'); 
    } else {
      alert("Sorry, no ideas found for that combination yet!");
    }
  };

  const handleChordSelect = (idea) => {
    console.log("User selected chord progression:", idea);
    setSelectedProgression(idea);
    // --- UPDATED: Go to Screen 3! ---
    setCurrentScreen('screen3'); 
  };
  
  // --- NEW: This function is passed to Screen 3 ---
  const handleGenerateMelodies = (sound, energy) => {
    console.log("Generating melodies for:", selectedProgression.chords);
    console.log("Sound:", sound, "Energy:", energy);

    // --- FAKE AI LOGIC FOR MELODIES ---
    // We'll just create some dummy data based on the user's choice
    const fakeMelodies = [
      { id: 1, name: `${energy} ${sound} Melody 1` },
      { id: 2, name: `${energy} ${sound} Melody 2` },
      { id: 3, name: `${energy} ${sound} Melody 3` }
    ];
    setMelodyIdeas(fakeMelodies);
    
    // --- This is where we will go to Screen 4 ---
    // setCurrentScreen('screen4'); 
    alert(`Melodies generated! Check the console (F12). We will build Screen 4 next!`);
  };

  // --- UPDATED: Smarter Back Button Logic ---
  const handleBack = () => {
    if (currentScreen === 'screen2') {
      setCurrentScreen('screen1');
    } else if (currentScreen === 'screen3') {
      setCurrentScreen('screen2');
    }
  };


  return (
    <div className="App-container">
      {currentScreen !== 'screen1' && (
        <button className="back-button" onClick={handleBack}>
          &lt; Back
        </button>
      )}

      {currentScreen === 'screen1' && (
        <SparkForm onGenerate={handleGenerateChords} />
      )}
      
      {currentScreen === 'screen2' && (
        <ChordPicker 
          ideas={chordIdeas} 
          onSelect={handleChordSelect} 
        />
      )}
      
      {currentScreen === 'screen3' && (
        <MelodyGenerator
          progression={selectedProgression}
          onGenerate={handleGenerateMelodies}
        />
      )}
    </div>
  );
}

export default App;