import React from 'react';
import { createRoot } from 'react-dom/client';
import LocalStorageProvider from '../../context/localStorageProvider';
import App from './App';
import '../../global/index.css';
import './index.scss';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);
root.render(
  <LocalStorageProvider>
    <App />
  </LocalStorageProvider>
);
