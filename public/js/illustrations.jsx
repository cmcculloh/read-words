import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Illustration from './illustration';
console.log('loaded');
const Illustrations = React.createClass({
	displayName: 'Illustrations',
	propTypes: {
		illustrations: PropTypes.array
	},
	renderIllustrations (illustrations) {
		return illustrations.map((illustration) => {
			return <Illustration src={illustration.src} />
		});
	},
	render () {
		const illustrations = this.renderIllustrations(this.props.illustrations);

		return (
			<div>
				{illustrations}
			</div>
		);
	}
});

module.exports = Illustrations;