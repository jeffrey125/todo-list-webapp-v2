import { useState } from 'react';

import { TodosObj, AddTodo } from './Types/TodosType';
import NewTodo from './components/NewTodo/NewTodo';
import Todos from './components/Todos/Todos';
import Card from './components/UI/Card';
import MainBG from './components/UI/MainBG';

function App() {
  const [todosArr, setTodosArr] = useState<TodosObj[]>([]);

  const addTodo: AddTodo = (todo) => {
    setTodosArr((state) => [...state, todo]);
  };

  return (
    <MainBG>
      <Card>
        {/* <button className="bg-palette1 p-2 mb-2 rounded-xl w-1/2 place-self-center">
          Toggle Dark Mode
        </button> */}
        <Todos items={todosArr} />
        <NewTodo onAddTodo={addTodo} />
      </Card>
    </MainBG>
  );
}

export default App;
