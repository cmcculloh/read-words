import React, { PropTypes } from 'react';

const Illustration = React.createClass({
	displayName: 'Illustration',
	propTypes: {
		word: PropTypes.shape({
			word: PropTypes.string.isRequired,
			img: PropTypes.string.isRequired
		}).isRequired,
		handleGuess: PropTypes.func.isRequired
	},
	handleClick () {
		this.props.handleGuess(this.props.word);
	},
	render () {
		return <img alt="that would be cheating" src={this.props.word.img} onClick={this.handleClick} />;
	}
});

module.exports = Illustration;
