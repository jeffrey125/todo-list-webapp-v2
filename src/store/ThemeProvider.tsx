import { useState, useEffect, ReactElement } from 'react';

import ThemeContext, { ThemeContextType } from './theme-context';

interface ThemeProviderProps {
  children: ReactElement;
}

interface UserTheme {
  theme: string;
  isDarkMode: boolean;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const userTheme = localStorage.getItem('theme');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState<string>('light');

  // TODO use 2 use effect 1 for setting local and 1 for getting local
  useEffect(() => {
    if (typeof userTheme !== 'string') {
      const initUserTheme: UserTheme = {
        theme: 'light',
        isDarkMode: false,
      };

      localStorage.setItem('theme', JSON.stringify(initUserTheme));
      setTheme(initUserTheme.theme);
      setIsDarkMode(initUserTheme.isDarkMode);
    }

    if (typeof userTheme === 'string') {
      const userThemeOption = JSON.parse(userTheme);
      console.log(userThemeOption);
      if (userThemeOption.theme === 'dark') {
        const userLightMode: UserTheme = {
          theme: 'light',
          isDarkMode: false,
        };
        return localStorage.setItem('theme', JSON.stringify(userLightMode));
      }

      if (userThemeOption.theme === 'light') {
        const userDarkMode: UserTheme = {
          theme: 'light',
          isDarkMode: true,
        };

        return localStorage.setItem('theme', JSON.stringify(userDarkMode));
      }
    }
  }, [userTheme, isDarkMode]);

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
