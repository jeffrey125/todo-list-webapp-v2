import { FormEvent, useState, ChangeEvent } from 'react';
import classes from './NewTodo.module.css';
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
    <div className={classes.container}>
      <form onSubmit={submitHandler} className={classes.formContainer}>
        <label htmlFor="text">Todo Text</label>
        <input type="text" id="text" onChange={inputHandler} value={todo} />
        <button>Add Todo</button>
      </form>
      {error && (
        <p style={{ textAlign: 'center', color: 'darkred' }}>
          Please Input a Valid Todo
        </p>
      )}
    </div>
  );
};

export default NewTodo;
