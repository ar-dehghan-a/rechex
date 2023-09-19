import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import '../../global/index.css';
import {LocalStorageProvider} from '../../context/LocalStorageProvider';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);
root.render(
  <LocalStorageProvider>
    <App />
  </LocalStorageProvider>
);
