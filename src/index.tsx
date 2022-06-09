import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import TodoProvider from './store/TodoProvider';
import ThemeProvider from './store/ThemeProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </ThemeProvider>
  </React.StrictMode>
);
