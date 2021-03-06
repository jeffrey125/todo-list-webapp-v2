import { FormEvent, useState, ChangeEvent, useContext, RefObject } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PlusIcon } from '@heroicons/react/solid';
import { motion, AnimatePresence } from 'framer-motion';

import { TodosObj } from '../../Types/TodosType';
import TodoContext from '../../store/todo-context';

interface NewTodoProps {
  dummyDiv: RefObject<HTMLDivElement>;
}

const errorVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.3,
    },
  },
};

const NewTodo = ({ dummyDiv }: NewTodoProps) => {
  const [todo, setTodo] = useState('');
  const [showError, setShowError] = useState(false);
  const todoCtx = useContext(TodoContext);
  const errorBorderColor: boolean | 'border-2 border-red-700' =
    showError && 'border-2 border-red-700';

  const inputHandler = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    const userInput = input.value;
    setTodo(userInput);

    if (userInput.length !== 0) {
      setShowError(false);
    }
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (todo.length === 0) {
      setShowError(true);
    } else {
      setShowError(false);

      // Todo Data
      const todoData: TodosObj = {
        todo,
        id: uuidv4(),
        done: false,
      };

      // Add Todo and make this await so that my scrollintoview wait the addTodo to render and scroll to the latest todo data
      const newTodo = new Promise<void>((resolve) =>
        resolve(todoCtx.addTodo(todoData))
      );

      await newTodo;
      setTodo('');

      // Scroll into view on the latest todo
      const divContainer = dummyDiv.current! as HTMLDivElement;
      divContainer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <form
      data-cy="cy-todo-form"
      onSubmit={submitHandler}
      className="mt-auto flex flex-col w-full items-start sm:gap-5 sm:flex-row sm:justify-center sm:items-center sm:h-20"
    >
      <label
        data-cy="cy-todo-label"
        htmlFor="text"
        className="text-2xl font-bold w-full sm:w-[30%] md:text-3xl"
      >
        Todo Text
      </label>
      <div className="relative flex items-center gap-5 h-[5rem] w-full">
        <input
          data-cy="cy-todo-input"
          type="text"
          id="text"
          className={`text-2xl h-12 w-full  lg:text-3xl lg:w-80 rounded-lg ${errorBorderColor} transition-colors duration-300 focus:outline-primaryColor p-1 dark:text-lightFontColor dark:bg-[#19364f]`}
          onChange={inputHandler}
          value={todo}
        />
        <AnimatePresence>
          {showError && (
            <motion.p
              data-cy="todo-input-error"
              animate="visible"
              initial="hidden"
              exit="hidden"
              variants={errorVariant}
              className="absolute bottom-[-5px] left-0 text-sm text-red-700"
            >
              Please Input a Valid Todo
            </motion.p>
          )}
        </AnimatePresence>

        <button
          data-cy="cy-submit-button"
          aria-label="Submit New Todo"
          type="submit"
          className="group flex items-center justify-center border-2 border-solid border-palette1 font-medium text-fontColor h-12 w-24 rounded-xl sm:w-[30%] lg:w-full lg:rounded-xl bg-palette1 transition-all duration-300 hover:bg-palette1Shade hover:text-lightFontColor hover:shadow active:bg-palette1Shade active:text-lightFontColor active:shadow focus:bg-palette1Shade focus:text-lightFontColor focus:shadow outline-none z-10"
          onClick={submitHandler}
        >
          <span data-cy="cy-submit-textContent" className="hidden sm:block">
            Add Todo
          </span>
          <PlusIcon
            data-cy="cy-submit-mobileIcon"
            className="block sm:hidden h-5 w-5 z-1"
          />
        </button>
      </div>
    </form>
  );
};

export default NewTodo;
