export interface TodosObj {
  id: string;
  todo: string;
}

type TodosArr = { items: TodosObj[] };

export default TodosArr;
