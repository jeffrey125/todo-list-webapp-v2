import { ReactNode, FormEvent } from 'react';

interface TodoButtonProps {
  handler: (e: FormEvent) => void;
  children: ReactNode;
  ariaLabelText: string;
  className?: string;
  disableButton?: boolean;
}

const TodoButton = ({
  handler,
  children,
  disableButton,
  className,
  ariaLabelText,
}: TodoButtonProps) => {
  return (
    <button
      onClick={handler}
      className={`group ${className} flex justify-center items-center border-2 border-solid border-palette1 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-palette1 hover:bg-palette1Shade hover:shadow  focus:bg-palette1Shade focus:shadow active:bg-palette1Shade active:shadow disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 outline-none`}
      aria-label={ariaLabelText}
      disabled={disableButton}
    >
      {children}
    </button>
  );
};

export default TodoButton;
