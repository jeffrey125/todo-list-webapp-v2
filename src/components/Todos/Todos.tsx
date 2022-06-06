import classes from './Todos.module.css';
import Todo from './Todo';
import TodosArr from '../../model/TodosType';

const Todos = ({ items }: TodosArr) => {
  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <Todo key={item.id} todo={item.todo} />
      ))}
    </ul>
  );
};

export default Todos;
