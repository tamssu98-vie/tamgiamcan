import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import Bg3D from './Bg3D';
createRoot(document.getElementById('root')!).render(<><Bg3D /><App /></>);
