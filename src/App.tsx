import { useContext } from 'react';

import TodoContext from './store/todo-context';
import NewTodo from './components/NewTodo/NewTodo';
import Todos from './components/Todos/Todos';
import Card from './components/UI/Card';
import MainBG from './components/UI/MainBG';
import ThemeSwitcher from './components/UI/ThemeSwitcher';

function App() {
  const todosCtx = useContext(TodoContext);

  return (
    // TODO Motion div opacity
    <MainBG>
      {/* TODO Motion div opacity */}
      <Card>
        <ThemeSwitcher />
        <Todos items={todosCtx.todos} />
        <NewTodo />
      </Card>
    </MainBG>
  );
}

export default App;
