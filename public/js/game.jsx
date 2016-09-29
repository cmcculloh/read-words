import React, { PropTypes } from 'react';
import Illustrations from './illustrations';
import Samus from './samus';
import Floor from './floor';

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
			currentWord,
			samusAction: 'standing'
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

	handleSuccess () {
		this.props.playSound('success');

		this.setState({
			samusAction: 'shooting',
			floorDirection: 'forward'
		});
	},

	handleError () {
		this.props.playSound('error');

		this.setState({
			samusAction: 'running',
			floorDirection: 'forward'
		});
	},

	handleGuess (choice) {
		if (choice.word === this.state.currentWord.word) {
			this.handleSuccess();

			const { currentWords, currentWord } = this.chooseWords(this.state.wordPool, this.state.currentNumberWords);
			this.setState({ currentWords, currentWord });
		} else {
			this.handleError();
		}
	},

	render () {
		return (
			<div>
				<h1>{this.state.currentWord.word}</h1>
				<Illustrations words={this.state.currentWords} handleGuess={this.handleGuess} />
				<Samus action={this.state.samusAction} />
				<Floor direction={this.state.floorDirection} />
			</div>
		);
	}
});

module.exports = Game;
