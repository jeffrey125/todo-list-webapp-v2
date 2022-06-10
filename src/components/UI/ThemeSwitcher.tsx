import { useContext } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/solid';

import ThemeContext from '../../store/theme-context';

const ThemeSwitcher = () => {
  const THEME_DURATION = 0.5 as const;
  const themeCtx = useContext(ThemeContext);
  const { isDarkMode, setToggleDarkMode } = themeCtx;

  const themeVariant = {
    switchOn: {
      x: `4.5rem`,
      transition: {
        duration: THEME_DURATION,
        type: 'spring',
        bounce: 0.4,
      },
    },
    switchOff: {
      x: `0rem`,
      transition: {
        duration: THEME_DURATION,
        type: 'spring',
        bounce: 0.4,
      },
    },
  };

  const iconVariant = {
    hidden: {
      rotate: 180,
    },
    exitIcon: {
      opacity: 0,
      rotate: -180,
      transition: {
        type: 'tween',
        duration: 0.3,
      },
    },
    visible: {
      rotate: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
      },
    },
  };

  const controls = useAnimation();

  // Theme button handlers
  const lightModeHandler = () => {
    setToggleDarkMode({ theme: 'light', isDarkMode: !isDarkMode });
    controls.start('switchOff');
  };

  const darkModeHandler = () => {
    setToggleDarkMode({ theme: 'dark', isDarkMode: !isDarkMode });
    controls.start('switchOn');
  };

  // Theme button switcher
  const themeButtonIcon = isDarkMode ? (
    <motion.button
      variants={themeVariant}
      animate={controls}
      onClick={lightModeHandler}
      className={`bg-palette1 p-2 rounded-full w-10 h-10 flex justify-center items-center border-2 border-solid border-palette1 translate-x-[4.5rem] outline-none focus:bg-palette1Shade`}
    >
      <motion.div
        className="flex items-center justify-center"
        key="moon"
        initial="hidden"
        animate="visible"
        exit="exitIcon"
        variants={iconVariant}
      >
        <MoonIcon className="h-5 w-5 sm:h-7 sm:w-7  fill-darkBG" />
      </motion.div>
    </motion.button>
  ) : (
    <motion.button
      variants={themeVariant}
      animate={controls}
      onClick={darkModeHandler}
      className={`bg-palette1 p-2 rounded-full w-10 h-10 flex justify-center items-center border-2 border-solid border-palette1 translate-x-0 outline-none focus:bg-palette1Shade`}
    >
      <motion.div
        key="sun"
        initial="hidden"
        animate="visible"
        exit="exitIcon"
        variants={iconVariant}
      >
        <SunIcon className="h-5 w-5 sm:h-7 sm:w-7 fill-lightBG" />
      </motion.div>
    </motion.button>
  );

  // Theme switcher animation and BG
  const themeButtonBG = isDarkMode ? 'bg-[#19364f]' : 'bg-lightBG';

  return (
    <div className="flex items-center gap-4 mb-4">
      <h1 className="text-lg break-words max-w-[5rem]">Theme Switcher</h1>
      <div
        className={`p-2 w-[8rem] ${themeButtonBG} rounded-full  transition-all duration-500`}
      >
        <AnimatePresence exitBeforeEnter>{themeButtonIcon}</AnimatePresence>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
