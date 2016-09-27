import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game';

const createSound = (fileName) => {
	// Create the audio tag
	const soundFile = document.createElement('audio');
	soundFile.preload = 'auto';

	// Load the sound file (using a source element for expandability)
	const src = document.createElement('source');
	src.src = fileName;
	soundFile.appendChild(src);

	// Load the audio tag
	// It auto plays as a fallback
	soundFile.load();
	soundFile.volume = 0.000000;
	soundFile.play();

	return soundFile;
};

const sounds = {
	error: createSound('sound/soundfx/samus_hurt.mp3'),
	success: createSound('sound/soundfx/health.mp3')
};

const playSound = (sound) => {
	const soundFile = sounds[sound];
	soundFile.currentTime = 0.01;
	soundFile.volume = 1;

	setTimeout(() => soundFile.play(), 1);
};

ReactDOM.render(
	<Game playSound={playSound} />,
	document.getElementById('content')
);
