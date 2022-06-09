import { ReactNode } from 'react';

interface MainBGProps {
  children: ReactNode;
}

const MainBG = ({ children }: MainBGProps) => {
  // TODO do dark mode logic here for BG

  return (
    <main className="spacer lightBG flex justify-center items-center w-screen h-screen">
      {children}
    </main>
  );
};

export default MainBG;
