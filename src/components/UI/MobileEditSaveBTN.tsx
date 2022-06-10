import { ReactNode, FormEvent } from 'react';

interface MobileEditSaveBTNProps {
  handler: (e: FormEvent) => void;
  children: ReactNode;
  className?: string;
  disableButton?: boolean;
}

const MobileEditSaveBTN = ({
  handler,
  children,
  disableButton,
  className,
}: MobileEditSaveBTNProps) => {
  return (
    <button
      onClick={handler}
      className={`group ${className} flex justify-center items-center border-2 border-solid border-palette1 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-palette1 hover:bg-palette1Shade hover:shadow  focus:bg-palette1Shade focus:shadow active:bg-palette1Shade active:shadow disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 outline-none`}
      disabled={disableButton}
    >
      {children}
    </button>
  );
};

export default MobileEditSaveBTN;
