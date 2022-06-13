import React from 'react';
import ReactDOM from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import './index.css';
import App from './App';
import TodoProvider from './store/TodoProvider';
import ThemeProvider from './store/ThemeProvider';
import TodoErrorBoundary from './components/Error/TodoErrorBoundary';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TodoErrorBoundary>
      <ThemeProvider>
        <TodoProvider>
          <MotionConfig reducedMotion="user">
            <App />
          </MotionConfig>
        </TodoProvider>
      </ThemeProvider>
    </TodoErrorBoundary>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
