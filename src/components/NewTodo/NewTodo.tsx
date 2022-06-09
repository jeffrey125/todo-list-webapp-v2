import { FormEvent, useState, ChangeEvent, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PlusIcon } from '@heroicons/react/solid';

import { TodosObj } from '../../Types/TodosType';
import TodoContext from '../../store/todo-context';

const NewTodo = () => {
  const [todo, setTodo] = useState('');
  const [error, showError] = useState(false);
  const todoCtx = useContext(TodoContext);

  const inputHandler = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    const userInput = input.value;
    setTodo(userInput);

    if (userInput.length !== 0) {
      showError(false);
    }
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (todo.length === 0) {
      showError(true);
    } else {
      showError(false);

      // Todo Data
      const todoData: TodosObj = {
        todo,
        id: uuidv4(),
        done: false,
      };

      // Add Todo
      todoCtx.addTodo(todoData);
      setTodo('');
    }
  };

  return (
    <div className="mt-auto sm:h-20">
      <form
        onSubmit={submitHandler}
        className="flex flex-col h-full w-full items-start sm:gap-5 sm:flex-row sm:justify-center sm:items-center"
      >
        <label
          htmlFor="text"
          className="text-2xl font-bold w-full sm:w-[30%] md:text-3xl"
        >
          Todo Text
        </label>
        <div className="relative flex items-center gap-5 h-[5rem] w-full">
          <input
            type="text"
            id="text"
            className="text-2xl h-12 w-full  lg:text-3xl lg:w-80 border-none rounded-lg focus: outline-none p-1 dark:text-fontColor"
            onChange={inputHandler}
            value={todo}
          />
          {error && (
            <p className="absolute bottom-[-5px] left-0 text-sm text-red-700">
              Please Input a Valid Todo
            </p>
          )}

          <button className="group flex items-center justify-center border-none font-medium h-12 w-24 rounded-xl sm:w-[30%] lg:w-full lg:rounded-xl bg-palette1 transition-all duration-300 hover:bg-palette1Shade hover:text-white hover:shadow active:bg-palette1Shade active:text-white active:shadow focus:bg-palette1Shade focus:text-white focus:shadow">
            <span className="hidden sm:block">Add Todo</span>
            <PlusIcon className="block sm:hidden h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTodo;
