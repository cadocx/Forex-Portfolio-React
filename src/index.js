import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './Containers/App/App';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';

const store = configureStore();

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<App />
		</Provider>
	</Router>,
	document.getElementById('root')
);

registerServiceWorker();
