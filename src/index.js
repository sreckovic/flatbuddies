import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Flat from './containers/Flat';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Flat />, document.getElementById('root'));
registerServiceWorker();
