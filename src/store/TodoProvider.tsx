import { useReducer, useEffect, ReactElement } from 'react';

import todoReducer, { initTodosState, todoStateInit } from './TodoReducer';
import TodoContext, { TodoContextType } from './todo-context';

interface TodoProviderProps {
  children: ReactElement;
}

const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todoState, dispatchTodoAction] = useReducer(
    todoReducer,
    initTodosState,
    todoStateInit
  );

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todoState));
  }, [todoState]);

  const todoContext: TodoContextType = {
    todos: todoState,
    addTodo: (todo) => {
      dispatchTodoAction({ type: 'ADD', payload: todo });
    },
    removeTodo: (id) => {
      dispatchTodoAction({ type: 'REMOVE', payload: id });
    },
    editTodo: (editedtodo) => {
      dispatchTodoAction({ type: 'EDIT', payload: editedtodo });
    },
    checkTodo: (id) => {
      dispatchTodoAction({ type: 'CHECK', payload: id });
    },
  };

  return (
    <TodoContext.Provider value={todoContext}>{children}</TodoContext.Provider>
  );
};

export default TodoProvider;
