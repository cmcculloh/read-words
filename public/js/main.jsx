import React from 'react';
import ReactDOM from 'react-dom';

import Illustrations from './illustrations';

const ill = [
	{src: "https://s3.amazonaws.com/ahoy-assets.twilio.com/global/images/wordmark.svg"},
	{src: "https://facebook.github.io/react/img/logo.svg"},
	{src: "http://images.clipartpanda.com/boy-20clip-20art-RiAykqLLT.jpeg"}
];

ReactDOM.render(
	<div>
		<Illustrations illustrations={ill} />
	</div>,
	document.getElementById('content')
);