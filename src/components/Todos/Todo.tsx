import classes from './Todo.module.css';

type TodoProps = {
  todo: string;
};

const Todo = ({ todo }: TodoProps) => {
  return (
    <div className={classes.container}>
      <li className={classes.listItem}>{todo}</li>
      <div className={classes.actions}>
        <button>Done</button>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default Todo;
