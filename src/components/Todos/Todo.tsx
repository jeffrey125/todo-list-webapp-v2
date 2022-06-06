import classes from './Todo.module.css';

type TodoProps = {
  todo: string;
};

const Todo = ({ todo }: TodoProps) => {
  return <li className={classes.listItem}>{todo}</li>;
};

export default Todo;
