import { useEffect, useContext } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/solid';

import ThemeContext from '../../store/theme-context';

const THEME_DURATION = 0.5 as const;

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
    x: 0,
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

const ThemeSwitcher = () => {
  const themeCtx = useContext(ThemeContext);
  const { toggleDarkMode, setToggleDarkMode } = themeCtx;

  const controls = useAnimation();

  const themeButtonIcon = toggleDarkMode ? (
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
  ) : (
    <motion.div
      className="flex items-center justify-center"
      key="sun"
      initial="hidden"
      animate="visible"
      exit="exitIcon"
      variants={iconVariant}
    >
      <SunIcon className="h-5 w-5 sm:h-7 sm:w-7 fill-lightBG" />
    </motion.div>
  );

  const themeButtonBG = toggleDarkMode ? 'bg-darkBG' : 'bg-lightBG';

  useEffect(() => {
    toggleDarkMode ? controls.start('switchOn') : controls.start('switchOff');
  }, [toggleDarkMode, controls]);

  const themeToggleHandler = () => {
    setToggleDarkMode(!toggleDarkMode);
  };

  return (
    <div className="flex items-center gap-4 mb-4">
      <h1 className="text-lg break-words max-w-[5rem]">Theme Switcher</h1>
      <div
        className={`p-2 w-[8rem] ${themeButtonBG} rounded-full  transition-all duration-500`}
      >
        <motion.button
          variants={themeVariant}
          animate={controls}
          onClick={themeToggleHandler}
          className={`bg-palette1 p-2 rounded-full w-10 h-10 flex justify-center items-center border-2 border-solid border-palette1`}
        >
          <AnimatePresence exitBeforeEnter>{themeButtonIcon}</AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
