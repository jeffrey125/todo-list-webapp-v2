import { createContext } from 'react';

interface ToggleDarkModeObject {
  theme: string;
  isDarkMode: boolean;
}
type ToggleDarkModeType = (userTheme: ToggleDarkModeObject) => void;

export interface ThemeContextType {
  theme: string;
  isDarkMode: boolean;
  setToggleDarkMode: ToggleDarkModeType;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  isDarkMode: false,
  setToggleDarkMode: () => {},
});

export default ThemeContext;
