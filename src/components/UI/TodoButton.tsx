import { ReactNode, FormEvent } from 'react';

interface TodoButtonProps {
  handler: (e: FormEvent) => void;
  children: ReactNode;
  disableButton?: boolean;
}

const TodoButton = ({ handler, children, disableButton }: TodoButtonProps) => {
  return (
    <button
      onClick={handler}
      className="group flex justify-center items-center border-none h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-palette1 transition-all duration-300 hover:bg-palette1Shade hover:shadow  focus:bg-palette1Shade focus:shadow active:bg-palette1Shade active:shadow disabled:bg-slate-600 disabled:cursor-not-allowed"
      disabled={disableButton}
    >
      {children}
    </button>
  );
};

export default TodoButton;
