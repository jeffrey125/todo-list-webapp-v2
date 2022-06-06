import { FormEvent, useState, ChangeEvent } from 'react';
import { TodosObj } from '../../model/TodosType';

type NewTodoProps = {
  onAddTodo: Function;
};

const NewTodo = (props: NewTodoProps) => {
  const [todo, setTodo] = useState('');
  const [error, showError] = useState(false);

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
      const todoData: TodosObj = {
        todo,
        id: new Date().getTime(),
      };
      props.onAddTodo(todoData);
      setTodo('');
    }
  };

  return (
    <div className="mt-auto h-20">
      <form
        onSubmit={submitHandler}
        className="flex items-center justify-center"
      >
        <label htmlFor="text" className="text-4xl mr-5">
          Todo Text
        </label>
        <input
          type="text"
          id="text"
          className="text-3xl h-8 w-1/2 mr-5 border-none rounded-lg focus: outline-none p-1"
          onChange={inputHandler}
          value={todo}
        />
        <button className="border-none h-8 w-32 rounded-lg bg-palette1 transition-all duration-300 hover:bg-palette1Shade hover:text-white hover:shadow active:bg-palette1Shade active:text-white active:shadow focus:bg-palette1Shade focus:text-white focus:shadow">
          Add Todo
        </button>
      </form>
      {error && (
        <p className="text-center text-red-700">Please Input a Valid Todo</p>
      )}
    </div>
  );
};

export default NewTodo;
