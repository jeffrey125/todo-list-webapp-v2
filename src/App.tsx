import { useState } from 'react';

import { TodosObj } from './model/TodosType';
import NewTodo from './components/NewTodo/NewTodo';
import Todos from './components/Todos/Todos';
import Card from './components/UI/Card';

function App() {
  const [todosArr, setTodosArr] = useState<TodosObj[]>([]);

  const addTodo = (todo: TodosObj) => {
    setTodosArr((state) => [...state, todo]);
  };

  return (
    <main className="flex justify-center items-center w-screen h-screen">
      <Card>
        <Todos items={todosArr} />
        <NewTodo onAddTodo={addTodo} />
      </Card>
    </main>
  );
}

export default App;
