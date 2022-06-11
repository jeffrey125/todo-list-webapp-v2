import { useState, useEffect, ReactElement } from 'react';

import ThemeContext, { ThemeContextType } from './theme-context';

interface ThemeTypes {
  isDarkMode: boolean;
  theme: string;
}
interface ThemeProviderProps {
  children: ReactElement;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const storageUserTheme: ThemeTypes = JSON.parse(
    localStorage.getItem('theme')!
  );

  const [userTheme, setUserTheme] = useState<ThemeTypes>(storageUserTheme);

  useEffect(() => {
    if (storageUserTheme === null) {
      return localStorage.setItem(
        'theme',
        JSON.stringify({ isDarkMode: false, theme: 'light' })
      );
    }

    if (storageUserTheme !== null) {
      return localStorage.setItem('theme', JSON.stringify(userTheme));
    }
  }, [storageUserTheme, userTheme]);

  const themeContext: ThemeContextType = {
    theme: userTheme?.theme,
    isDarkMode: userTheme?.isDarkMode,
    setToggleDarkMode: (userTheme) => {
      setUserTheme(userTheme);
    },
  };

  return (
    <ThemeContext.Provider value={themeContext}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
