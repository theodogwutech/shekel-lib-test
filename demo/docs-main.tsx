import React from 'react';
import ReactDOM from 'react-dom/client';
import Docs from './Docs';
import './style.css';
import '../src/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Docs />
  </React.StrictMode>
);
