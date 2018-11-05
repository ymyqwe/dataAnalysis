import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
