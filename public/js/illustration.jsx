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

module.exports = Illustration;