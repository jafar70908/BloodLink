import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppContent } from './App';
import { BloodlinkProvider } from './context/BloodlinkContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BloodlinkProvider>
      <AppContent />
    </BloodlinkProvider>
  </React.StrictMode>
);
