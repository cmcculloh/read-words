import React, { PropTypes } from 'react';
import Illustration from './illustration';

const Illustrations = React.createClass({
	displayName: 'Illustrations',
	propTypes: {
		words: PropTypes.arrayOf(PropTypes.shape({
			word: PropTypes.string.isRequired,
			img: PropTypes.string.isRequired
		})).isRequired,
		handleGuess: PropTypes.func.isRequired
	},
	renderIllustrations (words) {
		return words.map(
			(word) =>
				<Illustration
					word={word}
					key={word.word}
					handleGuess={this.props.handleGuess}
				/>
		);
	},
	render () {
		const illustrations = this.renderIllustrations(this.props.words);

		return (
			<div>
				{illustrations}
			</div>
		);
	}
});

module.exports = Illustrations;
