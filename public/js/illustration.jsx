import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

const Illustration = React.createClass({
	displayName: 'Illustration',
	propTypes: {
		src: PropTypes.string
	},
	render () {
		return (
			<img src={this.props.src} />
		);
	}
});


const createSound = (fileName) => {
	//Create the audio tag
	const soundFile = document.createElement("audio");
	soundFile.preload = "auto";

	//Load the sound file (using a source element for expandability)
	const src = document.createElement("source");
	src.src = fileName;
	soundFile.appendChild(src);

	//Load the audio tag
	//It auto plays as a fallback
	soundFile.load();
	soundFile.volume = 0.000000;
	soundFile.play();

	return soundFile;
}

const playSound = (soundFile) => {
	soundFile.currentTime = 0.01;
	soundFile.volume = 1;

	setTimeout(function(){soundFile.play();},1);
}

const error = createSound('sound/soundfx/samus_hurt.mp3');
const success = createSound('sound/soundfx/health.mp3');

playSound(error);

module.exports = Illustration;