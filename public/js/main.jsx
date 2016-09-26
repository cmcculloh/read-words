import React from 'react';
import ReactDOM from 'react-dom';

import Illustration from './illustration';

ReactDOM.render(
	<Illustration src="https://s3.amazonaws.com/ahoy-assets.twilio.com/global/images/wordmark.svg" />,
	document.getElementById('content')
);