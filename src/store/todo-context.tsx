import { createContext } from 'react';

import { TodosObj, AddTodo } from '../Types/TodosType';

export interface TodoContextType {
  todos: TodosObj[];
  addTodo: AddTodo;
  editTodo: (editedTodo: TodosObj) => void;
  checkTodo: (id: string) => void;
  removeTodo: (id: string) => void;
}

const TodoContext = createContext<TodoContextType>({
  todos: [],
  addTodo: () => {},
  editTodo: () => {},
  removeTodo: () => {},
  checkTodo: () => {},
});

export default TodoContext;
