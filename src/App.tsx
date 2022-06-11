import { useRef } from 'react';

import NewTodo from './components/NewTodo/NewTodo';
import Todos from './components/Todos/Todos';
import Card from './components/UI/Card';
import MainBG from './components/UI/MainBG';
import ThemeSwitcher from './components/UI/ThemeSwitcher';

function App() {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <MainBG>
      <Card>
        <ThemeSwitcher />
        <Todos dummyDiv={divRef} />
        <NewTodo dummyDiv={divRef} />
      </Card>
    </MainBG>
  );
}

export default App;
