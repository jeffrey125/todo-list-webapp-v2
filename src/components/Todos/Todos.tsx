import { AnimatePresence, Reorder } from 'framer-motion';
import { useContext, RefObject } from 'react';

import TodoContext from '../../store/todo-context';
import Todo from './Todo';

const containerVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 0.3,
      staggerChildren: 0.2,
    },
  },
};

interface TodosProps {
  dummyDiv: RefObject<HTMLDivElement>;
}

const Todos = ({ dummyDiv }: TodosProps) => {
  const todosCtx = useContext(TodoContext);
  const items = todosCtx.todos;

  return (
    <div className="overflow-hidden w-full h-[70%] border-2 border-primaryTint2 rounded-2xl sm:h-[100%]">
      <Reorder.Group
        values={items}
        onReorder={todosCtx.reorderTodos}
        animate="visible"
        initial="hidden"
        variants={containerVariant}
        className="text-2xl font-normal overflow-y-scroll flex flex-col h-full gap-7 pt-7 sm:gap-4 sm:pt-4"
        layoutScroll
      >
        <AnimatePresence>
          {items.map((item) => (
            <Todo key={item.id} id={item.id} todoData={item} />
          ))}
          <div ref={dummyDiv} />
        </AnimatePresence>
      </Reorder.Group>
    </div>
  );
};

export default Todos;
