import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <div
      className={`flex flex-col text-fontColor bg-primaryColor p-8 w-full h-full lg:rounded-2xl shadow-xl lg:w-[45rem] lg:h-[40rem] dark:bg-darkBG dark:text-lightFontColor transition-all duration-300`}
    >
      {children}
    </div>
  );
};

export default Card;
