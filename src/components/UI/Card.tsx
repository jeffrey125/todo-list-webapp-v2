import { ReactNode } from 'react';

type CardProps = {
  className?: string;
  children: ReactNode;
};

const Card = ({ className, children }: CardProps) => {
  return (
    <div
      className={`flex flex-col bg-primaryColor p-8 w-[45rem] h-[40rem] rounded-2xl shadow-xl ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
