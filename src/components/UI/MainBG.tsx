import { ReactNode, useContext, useState, useEffect } from 'react';

import ThemeContext from '../../store/theme-context';

interface MainBGProps {
  children: ReactNode;
}

const MainBG = ({ children }: MainBGProps) => {
  const themeCtx = useContext(ThemeContext);
  const { theme, isDarkMode } = themeCtx;
  const [themeBG, setThemeBG] = useState('lightBG');

  useEffect(() => {
    if (isDarkMode) {
      setThemeBG('darkBG');
    } else {
      setThemeBG('lightBG');
    }
  }, [isDarkMode]);

  return (
    <main
      className={`spacer ${theme} ${themeBG} bg-darkBG flex justify-center items-center w-screen h-screen transition-all duration-500`}
    >
      {children}
    </main>
  );
};

export default MainBG;
