import './App.css';
import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [audioTriggers, setAudioTriggers] = useState(["Q", "W", "E", "A", "S", "D", "Z", "X", "C"]);
  const [audioSamples, setAudioSamples] = useState({
    heater1: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3",
    heater2: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3",
    heater3: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3",
    heater4: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3",
    clap: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3",
    openHH: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3",
    kickAndHH: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3",
    kick: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3",
    closedHH: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3"
  });

  
  const audioElements = useRef({});

  useEffect(() => {
    // Preload all audio elements
    Object.keys(audioSamples).forEach(key => {
      const audio = new Audio(audioSamples[key]);
      audioElements.current[key] = audio;
    });
  }, [audioSamples]);

  function playAudioClicked(event) {
    const audioElement = event.target.querySelector('audio');
    if (audioElement) {  
      generateDisplayText(audioElement.id);
      var playPromise = audioElement.play();

      if (playPromise !== undefined) {
        playPromise.then(_ => {
          // Doesn't need to have anything.
        })
        .catch(error => {
          // Auto-play was prevented, the audio is paused.
          console.log("CLICKED ERROR:" + error);
        });
      }
    }  
  }

  function playAudioKeyPressed(event) {
    let audioElement = null;
    const key = event.key.toUpperCase();
    switch (key) {
      case "Q":
        audioElement = document.getElementById(key);
        generateDisplayText(key);
        break;
      case "W":
        audioElement = document.getElementById(key);
        generateDisplayText(key);
        break;
      case "E":
        audioElement = document.getElementById(key);
        generateDisplayText(key);
        break;
      case "A":
        audioElement = document.getElementById(key);
        generateDisplayText(key);
        break;
      case "S":
        audioElement = document.getElementById(key);
        generateDisplayText(key);
        break;
      case "D":
        audioElement = document.getElementById(key);
        generateDisplayText(key);
        break;
      case "Z":
        audioElement = document.getElementById(key);
        generateDisplayText(key);
        break;
      case "X":
        audioElement = document.getElementById(key);
        generateDisplayText(key);
        break;  
      case "C":
        audioElement = document.getElementById(key);
        generateDisplayText(key);
        break;
      default:
        generateDisplayText(event.key);
        break;
    }
    if (audioElement) {
      var playPromise = audioElement.play();

      if (playPromise !== undefined) {
        playPromise.then(_ => {
          // Nothing needs to be returned--the audio is playing.
        })
        .catch(error => {
          console.log("CLICKED ERROR:" + error);
          // Auto-play was prevented, the audio is paused.
        });
      }
    }
  }

  function generateDisplayText(key) {
    const displayText = document.getElementById("display");
    if (audioTriggers.includes(key)) {
      for (let i = 0; i < audioTriggers.length; i++) {
        if (audioTriggers[i] === key) {
          displayText.innerText = `Now Playing: ${Object.keys(audioSamples)[i]}`;
          console.log(displayText.innerText);
        }  
      }
    } else {
      displayText.innerText = `Sorry, ${key} isnt mapped to a drum pad.  Please Try again!`
    }
  }
  
  return (
    <div id="drum-machine" className="App">
      <h1>Drum Machine Project</h1>
      <h2>By Robbie Ellis</h2>
      <div id="display">Click a button to hear the sound, or press the corresponding key.</div>
      <br/>
      <DrumPadGenerator audioTriggers={audioTriggers} audioSamples={audioSamples} 
        playAudioClicked={playAudioClicked} playAudioKeyPressed={playAudioKeyPressed} />
    </div>
  );
}

function DrumPadGenerator({ audioTriggers, audioSamples, playAudioClicked, playAudioKeyPressed}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      playAudioKeyPressed(event);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [playAudioKeyPressed]);
  const drumPads = (
    audioTriggers.map((el, index) => (
      <button onClick={playAudioClicked} id={Object.keys(audioSamples)[index]} className="drum-pad" key={el}>{el}
        <audio src={Object.values(audioSamples)[index]} className="clip" id={el}></audio>
      </button>
    ))
  );
  return drumPads;
}

export default App;
