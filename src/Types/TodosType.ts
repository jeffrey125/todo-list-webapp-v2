export interface TodosObj {
  id: string;
  todo: string;
  done: boolean;
}

export type AddTodo = (todo: TodosObj) => void;

type TodosArr = { items: TodosObj[] };

export default TodosArr;
