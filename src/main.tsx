import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { TaskProvider } from './context/useContextLocalStorage.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TaskProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TaskProvider>
);
