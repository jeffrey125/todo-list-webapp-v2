import { useState, useEffect, ReactElement } from 'react';

import ThemeContext, { ThemeContextType } from './theme-context';

interface ThemeProviderProps {
  children: ReactElement;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (!isDarkMode) {
      return setTheme('light');
    }

    if (isDarkMode) {
      return setTheme('dark');
    }
  }, [isDarkMode]);

  const themeContext: ThemeContextType = {
    theme,
    toggleDarkMode: isDarkMode,
    setToggleDarkMode: (prevState: boolean) => {
      setIsDarkMode(prevState);
    },
  };

  return (
    <ThemeContext.Provider value={themeContext}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
