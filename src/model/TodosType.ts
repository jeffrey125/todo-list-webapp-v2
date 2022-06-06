export interface TodosObj {
  id: number;
  todo: string;
}

type TodosArr = { items: TodosObj[] };

export default TodosArr;
