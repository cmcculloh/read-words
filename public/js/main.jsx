import React from 'react';
import ReactDOM from 'react-dom';

import Illustration from './illustration';

ReactDOM.render(
	<div>
		<Illustration src="https://s3.amazonaws.com/ahoy-assets.twilio.com/global/images/wordmark.svg" />
		<Illustration src="https://facebook.github.io/react/img/logo.svg" />
	</div>,
	document.getElementById('content')
);