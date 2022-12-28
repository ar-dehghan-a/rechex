import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);
root.render(<App />);
