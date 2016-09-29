import React, { PropTypes } from 'react';

const sprites = {
	forward: {
		maxFrames: 3
	}
};

const Floor = React.createClass({
	displayName: 'Floor',
	propTypes: {
		direction: PropTypes.string
	},
	getInitialState () {
		return {
			frame: 0,
			previousDirection: null
		};
	},
	componentWillReceiveProps () {
		if (this.props.direction !== this.state.previousDirection) {
			this.setState({
				previousDirection: this.props.direction
			});
		}

		this.actionLoop = window.setTimeout(this.updateFrame, 1);
	},
	updateFrame () {
		let currentFrame = this.state.frame;

		currentFrame += 1;
		if (currentFrame > sprites[this.props.direction].maxFrames) {
			currentFrame = 1;
		}

		this.setState({ frame: currentFrame });

		window.clearTimeout(this.actionLoop);
		this.actionLoop = window.setTimeout(this.updateFrame, 75);
	},
	render () {
		const altText = 'floor';
		const classes = altText + ' ' + this.props.direction + this.state.frame;

		return <div alt={altText} className={classes}></div>;
	}
});

module.exports = Floor;
