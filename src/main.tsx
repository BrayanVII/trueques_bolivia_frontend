import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
//import { MainScreen } from './MainP/MainScreen';  // ✔ CORRECTO SEGÚN TU IMAGEN

import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
