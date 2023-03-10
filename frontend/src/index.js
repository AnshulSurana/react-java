import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Routes from './Routes';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
