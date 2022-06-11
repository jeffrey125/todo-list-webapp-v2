import { AnimatePresence, motion } from 'framer-motion';
import { useContext } from 'react';
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

const Todos = () => {
  const todosCtx = useContext(TodoContext);
  const items = todosCtx.todos;

  return (
    <div className="overflow-hidden w-full h-[70%] border-2 border-primaryTint2 rounded-2xl sm:h-[85%]">
      <motion.ul
        animate="visible"
        initial="hidden"
        variants={containerVariant}
        className="scroll-smooth text-2xl font-normal overflow-y-scroll flex flex-col h-full"
      >
        <AnimatePresence>
          {items.map((item) => (
            <Todo key={item.id} id={item.id} todoData={item} />
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
};

export default Todos;
