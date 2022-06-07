export interface TodosObj {
  id: string;
  todo: string;
}

export type AddTodo = (todo: TodosObj) => void;

type TodosArr = { items: TodosObj[] };

export default TodosArr;
