import { TodosObj } from '../Types/TodosType';

type ACTIONTYPE =
  | { type: 'ADD'; payload: TodosObj }
  | { type: 'REMOVE'; payload: string }
  | { type: 'EDIT'; payload: TodosObj }
  | { type: 'CHECK'; payload: string };

type TodoStateInitType = () => typeof initTodosState;

export const initTodosState: TodosObj[] = [];

export const todoStateInit: TodoStateInitType = () => {
  const getTodoArray: string | null = localStorage.getItem('todo');

  if (typeof getTodoArray === 'string') {
    const todoArray: TodosObj[] = JSON.parse(getTodoArray);

    if (todoArray.length > 0) {
      return todoArray;
    }

    return initTodosState;
  }
  return initTodosState;
};

const todoReducer = (
  state: typeof initTodosState,
  action: ACTIONTYPE
): TodosObj[] => {
  if (action.type === 'ADD') {
    const newTodosState: TodosObj[] = [...state, action.payload];

    return newTodosState;
  }

  if (action.type === 'REMOVE') {
    let removedArr: TodosObj[];

    if (state.length !== 0) {
      removedArr = state.filter((todo) => {
        return todo.id !== action.payload;
      });

      return removedArr;
    }
  }

  if (action.type === 'EDIT') {
    const editedArr = state.map((todo) => {
      if (todo.id === action.payload.id) {
        return action.payload;
      }

      return todo;
    });

    return editedArr;
  }

  if (action.type === 'CHECK') {
    const checkTodo = state.map((todo) => {
      if (todo.id === action.payload) {
        if (!todo.done) {
          return { ...todo, done: true };
        }
        return { ...todo, done: false };
      }
      return todo;
    });

    return checkTodo;
  }

  return initTodosState;
};

export default todoReducer;
