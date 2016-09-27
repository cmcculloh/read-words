import React, { PropTypes } from 'react';

const Illustration = React.createClass({
	displayName: 'Illustration',
	propTypes: {
		src: PropTypes.string.isRequired,
		handleGuess: PropTypes.func.isRequired
	},
	render () {
		return <img alt="that would be cheating" src={this.props.src} onClick={this.props.handleGuess} />;
	}
});

module.exports = Illustration;
