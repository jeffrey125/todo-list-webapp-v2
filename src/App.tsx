import NewTodo from './components/NewTodo/NewTodo';
import Todos from './components/Todos/Todos';
import Card from './components/UI/Card';
import MainBG from './components/UI/MainBG';
import ThemeSwitcher from './components/UI/ThemeSwitcher';

function App() {
  return (
    <MainBG>
      <Card>
        <ThemeSwitcher />
        <Todos />
        <NewTodo />
      </Card>
    </MainBG>
  );
}

export default App;
