import { useContext } from 'react';

import TodoContext from './store/todo-context';
import NewTodo from './components/NewTodo/NewTodo';
import Todos from './components/Todos/Todos';
import Card from './components/UI/Card';
import MainBG from './components/UI/MainBG';

function App() {
  const todosCtx = useContext(TodoContext);

  return (
    // TODO Motion div opacity
    <MainBG>
      {/* TODO Motion div opacity */}
      <Card>
        {/* <button className="bg-palette1 p-2 mb-2 rounded-xl w-1/2 place-self-center">
          Toggle Dark Mode
        </button> */}
        <Todos items={todosCtx.todos} />
        <NewTodo />
      </Card>
    </MainBG>
  );
}

export default App;
