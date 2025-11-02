import React from 'react';
// NEW: Import the MIDI writer library
import MidiWriter from './lib/midi-writer';

// We get props from App.js:
// 1. `progression`: The final chord progression object (with notes!)
// 2. `melody`: The final melody object (we're not using this yet, but we will)
// 3. `onStartOver`: A function to go back to Screen 1

function ExportScreen({ progression, melody, onStartOver }) {

  const handleDownload = () => {
    // --- THIS IS THE MIDI LOGIC ---
    
    // 1. Create a new MIDI track
    const track = new MidiWriter.Track();

    // 2. Set the instrument (e.g., 'Acoustic Grand Piano' which is 1)
    track.addEvent(new MidiWriter.ProgramChangeEvent({ instrument: 1 }));

    // 3. Loop through the chords in our `progression` object
    //    Each chord is an array of notes (e.g., ['C4', 'E4', 'G4'])
    progression.notes.forEach(chordNotes => {
      // 4. Create a NoteEvent for each chord.
      //    'pitch': The array of notes
      //    'duration': '1' = whole note
      const note = new MidiWriter.NoteEvent({ 
        pitch: chordNotes, 
        duration: '1' 
      });
      
      // 5. Add the note to the track
      track.addEvent(note);
    });

    // 6. Generate the MIDI file
    const write = new MidiWriter.Writer([track]);
    
    // 7. Trigger the download
    const link = document.createElement('a');
    link.href = write.dataUri();
    link.download = `my-song-idea (${progression.chords}).mid`;
    link.click();
  };

  return (
    <div className="screen">
      <div className="export-icon">✅</div>
      <h1>Your new idea is ready!</h1>
      <p>=======================</p>

      <div className="final-summary">
        <label>YOUR CHORDS</label>
        <p>{progression.chords} <span>({progression.key})</span></p>
        <label>YOUR MELODY</label>
        <p>{melody.name}</p>
      </div>

      <button className="cta-button" onClick={handleDownload}>
        DOWNLOAD AS MIDI FILE
      </button>

      <button className="secondary-button" onClick={onStartOver}>
        Start a New Song Idea
      </button>
    </div>
  );
}

export default ExportScreen;
