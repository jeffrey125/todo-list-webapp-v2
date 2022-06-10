import { ReactNode, useContext } from 'react';

import ThemeContext from '../../store/theme-context';

interface MainBGProps {
  children: ReactNode;
}

const MainBG = ({ children }: MainBGProps) => {
  const themeCtx = useContext(ThemeContext);
  const { theme, isDarkMode } = themeCtx;

  const themeBG = isDarkMode ? 'darkBG' : 'lightBG';

  return (
    <main
      className={`spacer ${theme} ${themeBG} dark:bg-darkBG bg-lightBG flex justify-center items-center w-screen h-screen transition-all duration-500`}
    >
      {children}
    </main>
  );
};

export default MainBG;
