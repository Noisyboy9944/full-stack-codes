// This file acts as our "Fake AI" for the MVP.
// We've UPDATED it to include MIDI-compatible note arrays.

export const musicData = {
  genres: ["Pop", "Lo-fi", "R&B", "Cinematic"],
  moods: ["Happy", "Sad", "Chill", "Energetic"],
  
  // This is the "brain"
  progressions: {
    pop: {
      happy: [
        { key: "C Major", chords: "C - G - Am - F", 
          // C4, G4, Am, F4
          notes: [
            ['C4', 'E4', 'G4'], // C Major
            ['G4', 'B4', 'D5'], // G Major
            ['A4', 'C5', 'E5'], // A Minor
            ['F4', 'A4', 'C5']  // F Major
          ] 
        },
        { key: "G Major", chords: "G - D - Em - C",
          // G4, D4, Em, C4
          notes: [
            ['G4', 'B4', 'D5'], // G Major
            ['D4', 'F#4', 'A4'], // D Major
            ['E4', 'G4', 'B4'], // E Minor
            ['C4', 'E4', 'G4']  // C Major
          ]
        },
      ],
      sad: [
        { key: "A Minor", chords: "Am - F - C - G",
          // Am, F4, C4, G4
          notes: [
            ['A4', 'C5', 'E5'], // A Minor
            ['F4', 'A4', 'C5'], // F Major
            ['C4', 'E4', 'G4'], // C Major
            ['G4', 'B4', 'D5']  // G Major
          ]
        },
        { key: "E Minor", chords: "Em - C - G - D",
          // Em, C4, G4, D4
          notes: [
            ['E4', 'G4', 'B4'], // E Minor
            ['C4', 'E4', 'G4'], // C Major
            ['G4', 'B4', 'D5'], // G Major
            ['D4', 'F#4', 'A4'] // D Major
          ]
        },
      ],
    },
    lofi: {
      chill: [
        { key: "A Minor", chords: "Am7 - Dm7 - G7 - Cmaj7",
          // Am7, Dm7, G7, Cmaj7
          notes: [
            ['A4', 'C5', 'E5', 'G5'], // Am7
            ['D4', 'F4', 'A4', 'C5'], // Dm7
            ['G4', 'B4', 'D5', 'F5'], // G7
            ['C4', 'E4', 'G4', 'B4']  // Cmaj7
          ]
        },
      ],
    },
    // You can add more genres and moods here...
  },
};
