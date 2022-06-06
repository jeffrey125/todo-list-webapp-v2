import Todo from './Todo';
import TodosArr from '../../model/TodosType';

const Todos = ({ items }: TodosArr) => {
  return (
    <ul className="text-3xl overflow-scroll h-[30rem] p-0 m-0 flex flex-col">
      {items.map((item) => (
        <Todo key={item.id} todo={item.todo} />
      ))}
    </ul>
  );
};

export default Todos;
