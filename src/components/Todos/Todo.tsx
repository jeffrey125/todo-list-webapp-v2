import { MouseEvent, useContext } from 'react';
import { CheckIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';

import { TodosObj } from '../../Types/TodosType';
import TodoContext from '../../store/todo-context';

type TodoProps = {
  id: string;
  todo: TodosObj;
};

const Todo = ({ todo, id }: TodoProps) => {
  const todoCtx = useContext(TodoContext);

  const strikeTodo = todo.done ? 'todoCheck' : 'todoUncheck';

  const doneHandler = () => {
    return todoCtx.checkTodo(id);
  };

  const editHandler = (_: MouseEvent) => {
    console.log(id);
  };
  const deleteHandler = () => {
    todoCtx.removeTodo(id);
  };

  return (
    <div className="flex flex-col gap-5 w-full border-b-2 border-primaryTint2 py-4 sm:flex-row sm:justify-between sm: items-center lg:gap-0">
      <li
        className={`${strikeTodo} list-none break-all mx-4 sm:ml-4 sm:mx-0 sm:w-full`}
      >
        {todo.todo}
      </li>
      <div className="flex justify-center w-full gap-5 sm:justify-end sm:mr-4">
        <button
          onClick={doneHandler}
          className="group flex justify-center items-center border-none h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-palette1 transition-all duration-300 hover:bg-palette1Shade hover:shadow  focus:bg-palette1Shade focus:shadow active:bg-palette1Shade active:shadow"
        >
          <CheckIcon className="h-5 w-5 sm:h-7 sm:w-7  group-hover:fill-white transition-all duration-300" />
        </button>
        <button
          onClick={editHandler}
          className="group flex justify-center items-center border-none h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-palette1 transition-all duration-300 hover:bg-palette1Shade hover:shadow  focus:bg-palette1Shade focus:shadow active:bg-palette1Shade active:shadow"
        >
          <PencilIcon className="h-5 w-5 sm:h-7 sm:w-7  group-hover:fill-white transition-all duration-300" />
        </button>
        <button
          onClick={deleteHandler}
          className="group flex justify-center items-center border-none h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-palette1 transition-all duration-300 hover:bg-palette1Shade hover:shadow  focus:bg-palette1Shade focus:shadow active:bg-palette1Shade active:shadow"
        >
          <TrashIcon className="h-5 w-5 sm:h-7 sm:w-7  group-hover:fill-white transition-all duration-300" />
        </button>
      </div>
    </div>
  );
};

export default Todo;
