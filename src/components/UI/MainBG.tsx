import { ReactNode, useContext, useState, useEffect } from 'react';

import ThemeContext from '../../store/theme-context';

interface MainBGProps {
  children: ReactNode;
}

const MainBG = ({ children }: MainBGProps) => {
  const themeCtx = useContext(ThemeContext);
  const { isDarkMode } = themeCtx;
  const [themeBG, setThemeBG] = useState('lightBG');

  useEffect(() => {
    if (isDarkMode) {
      setThemeBG('darkBG');
    } else {
      setThemeBG('lightBG');
    }
  }, [isDarkMode]);

  return (
    <section
      className={`spacer ${themeBG} bg-darkBG flex justify-center items-center w-screen h-screen transition-all duration-500`}
    >
      {children}
    </section>
  );
};

export default MainBG;
