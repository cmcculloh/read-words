import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Illustration from './illustration';
console.log('loaded');
const Illustrations = React.createClass({
	displayName: 'Illustrations',
	propTypes: {
		words: PropTypes.array
	},
	renderIllustrations (words) {
		return words.map((word) => {
			return <Illustration src={word.img} key={word.word} />
		});
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