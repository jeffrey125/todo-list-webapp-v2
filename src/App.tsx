import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useContext, useEffect, Suspense } from 'react';

import PageLoader from './components/UI/PageLoader';
import ThemeContext from './store/theme-context';
const Card = React.lazy(() => import('./components/UI/Card'));
const MainBG = React.lazy(() => import('./components/UI/MainBG'));
const ThemeSwitcher = React.lazy(() => import('./components/UI/ThemeSwitcher'));
const Todos = React.lazy(() => import('./components/Todos/Todos'));
const NewTodo = React.lazy(() => import('./components/NewTodo/NewTodo'));

const containerVariant = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.3,
    },
    hidden: {
      opacity: 0,
    },
  },
};

function App() {
  const divRef = useRef<HTMLDivElement>(null);
  const themeCtx = useContext(ThemeContext);
  const { theme, isDarkMode } = themeCtx;

  useEffect(() => {
    const root = window.document.documentElement;

    if (isDarkMode) {
      root.classList.remove('light');
      root.classList.add(theme);
    } else {
      root.classList.remove('dark');
      root.classList.add(theme);
    }
  }, [theme, isDarkMode]);

  return (
    <AnimatePresence exitBeforeEnter>
      <Suspense fallback={<PageLoader />}>
        <motion.main
          key="main-content"
          animate="visible"
          initial="hidden"
          exit="hidden"
          variants={containerVariant}
        >
          <MainBG>
            <Card>
              <ThemeSwitcher />
              <Todos dummyDiv={divRef} />
              <NewTodo dummyDiv={divRef} />
            </Card>
          </MainBG>
        </motion.main>
      </Suspense>
    </AnimatePresence>
  );
}

export default App;
