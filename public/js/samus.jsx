import React, { PropTypes } from 'react';

const sprites = {
	running: {
		maxFrames: 3
	},
	standing: {
		maxFrames: 1
	},
	jumping: {
		maxFrames: 5
	},
	shooting: {
		maxFrames: 3
	}
};

const Samus = React.createClass({
	displayName: 'Samus',
	propTypes: {
		action: PropTypes.string
	},
	getInitialState () {
		return {
			frame: 0,
			previousAction: null
		};
	},
	componentWillReceiveProps () {
		if (this.props.action !== this.state.previousAction) {
			this.setState({
				previousAction: this.props.action
			});
		}

		this.actionLoop = window.setTimeout(this.updateFrame, 1);
	},
	updateFrame () {
		let currentFrame = this.state.frame;

		currentFrame += 1;
		if (currentFrame > sprites[this.props.action].maxFrames) {
			currentFrame = 1;
		}

		this.setState({ frame: currentFrame });

		window.clearTimeout(this.actionLoop);
		this.actionLoop = window.setTimeout(this.updateFrame, 75);
	},
	render () {
		const actionClass = this.props.action + this.state.frame;
		const altText = 'samus ' + this.props.action;
		const classes = altText + ' ' + actionClass;

		return <div alt={altText} className={classes}></div>;
	}
});

module.exports = Samus;
