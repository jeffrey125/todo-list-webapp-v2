import { motion } from 'framer-motion';
import { useEffect, useState, useContext } from 'react';
import { HashLoader } from 'react-spinners';

import ThemeContext from '../../store/theme-context';

const containerVariant = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
    hidden: {
      opacity: 0,
    },
  },
};

const PageLoader = () => {
  const [loaderColor, setLoaderColor] = useState('#c5dbee');

  const themeCtx = useContext(ThemeContext);

  useEffect(() => {
    if (themeCtx.isDarkMode) {
      setLoaderColor('#c5dbee');
    } else {
      setLoaderColor('#060e14');
    }
  }, [themeCtx.isDarkMode]);

  return (
    <motion.div
      key="page-loader"
      animate="visible"
      initial="hidden"
      exit="hidden"
      variants={containerVariant}
      className="flex items-center justify-center h-screen w-screen bg-lightBG dark:bg-darkBG"
    >
      <h1 className="flex items-center justify-center gap-5 text-5xl text-fontColor dark:text-lightFontColor transition-colors duration-300">
        <span>Loading</span>
        <HashLoader color={loaderColor} speedMultiplier={1.5} />
      </h1>
    </motion.div>
  );
};

export default PageLoader;
