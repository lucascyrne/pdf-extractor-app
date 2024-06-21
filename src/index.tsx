import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { app } from './firebase';

console.log('Firebase App:', app);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
