import Todo from './Todo';
import TodosArr from '../../Types/TodosType';

const Todos = ({ items }: TodosArr) => {
  return (
    <div className="overflow-hidden w-full h-3/4 border-2 border-primaryTint2 rounded-2xl sm:h-[85%]">
      {/* Todo animate exit animation of todo */}
      <ul className="scroll-smooth text-2xl font-normal overflow-y-scroll flex flex-col h-full">
        {items.map((item) => (
          <Todo key={item.id} id={item.id} todoData={item} />
        ))}
      </ul>
    </div>
  );
};

export default Todos;
