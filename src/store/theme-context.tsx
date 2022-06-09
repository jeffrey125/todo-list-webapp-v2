import { createContext } from 'react';

export interface ThemeContextType {
  theme: string;
  toggleDarkMode: boolean;
  setToggleDarkMode: (prevState: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleDarkMode: false,
  setToggleDarkMode: () => {},
});

export default ThemeContext;
