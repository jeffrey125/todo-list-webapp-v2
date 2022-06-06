import { ReactNode } from 'react';
import classes from './Card.module.css';

type CardProps = {
  className?: string;
  children: ReactNode;
};

const Card = ({ className, children }: CardProps) => {
  return <div className={`${classes.container} ${className}`}>{children}</div>;
};

export default Card;
