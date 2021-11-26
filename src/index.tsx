import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import { App } from './App';
import { httpInterceptors } from 'services/interceptor';

httpInterceptors();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);