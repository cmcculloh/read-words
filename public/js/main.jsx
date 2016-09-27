import React from 'react';
import ReactDOM from 'react-dom';

import Illustrations from './illustrations';

import geh from '../data/green_eggs_and_ham';
import level1 from '../data/level1';

const words = geh.concat(level1);

ReactDOM.render(
	<div>
		<Illustrations words={words} />
	</div>,
	document.getElementById('content')
);