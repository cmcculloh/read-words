import React, { PropTypes } from 'react';
import Illustrations from './illustrations';

import geh from '../data/green_eggs_and_ham';
import level1 from '../data/level1';

import sampleSize from 'lodash.samplesize';

const allWords = geh.concat(level1);
const startingNumberWords = 3;

const Game = React.createClass({
	displayName: 'Game',

	propTypes: {
		playSound: PropTypes.func.isRequired
	},

	getInitialState () {
		const { currentWords, currentWord } = this.chooseWords(allWords, startingNumberWords);
		const wordPool = allWords;

		return {
			wordPool,
			currentNumberWords: startingNumberWords,
			currentWords,
			currentWord
		};
	},

	chooseWords (words, numberWordsToChoose) {
		const currentWords = sampleSize(words, numberWordsToChoose);
		const currentWord = sampleSize(currentWords, 1)[0];

		return {
			currentWords,
			currentWord
		};
	},

	handleGuess (choice) {
		if (choice.word === this.state.currentWord.word) {
			this.props.playSound('success');

			const { currentWords, currentWord } = this.chooseWords(this.state.wordPool, this.state.currentNumberWords);
			this.setState({ currentWords, currentWord });
		} else {
			this.props.playSound('error');
		}
	},

	render () {
		return (
			<div>
				<h1>{this.state.currentWord.word}</h1>
				<Illustrations words={this.state.currentWords} handleGuess={this.handleGuess} />
			</div>
		);
	}
});

module.exports = Game;
