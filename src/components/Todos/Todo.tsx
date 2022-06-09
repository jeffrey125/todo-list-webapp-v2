import { useContext, useState, ChangeEvent, FormEvent } from 'react';
import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  SaveIcon,
} from '@heroicons/react/solid';

import { TodosObj } from '../../Types/TodosType';
import TodoContext from '../../store/todo-context';
import TodoButton from '../UI/TodoButton';

interface TodoProps {
  id: string;
  todoData: TodosObj;
}

interface EditError {
  message: string;
  showError: boolean;
}

interface EditData {
  originalTodo: string;
  editedTodo: string;
  renderTodo: string;
}

const Todo = ({ todoData, id }: TodoProps) => {
  const todo: string = todoData.todo;
  const todoCtx = useContext(TodoContext);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [editError, setEditError] = useState<EditError>({
    message: '',
    showError: false,
  });
  const [editData, setEditData] = useState<EditData>({
    originalTodo: todo,
    editedTodo: '',
    renderTodo: todo,
  });

  const strikeTodo = todoData.done ? 'todoCheck' : 'todoUncheck';

  // Check Functionality
  const doneHandler = () => {
    todoCtx.checkTodo(id);
    setEditError((prevState) => {
      return { ...prevState, message: '', showError: false };
    });
  };

  // Edit Functionality
  const showEditInputHandler = () => {
    setEditError((prevState) => {
      return { ...prevState, message: '', showError: false };
    });

    setEditData((prevState) => {
      return {
        ...prevState,
        editedTodo: editData.originalTodo,
        renderTodo: editData.originalTodo,
      };
    });

    if (todoData.done) {
      return setEditError((prevState) => {
        return {
          ...prevState,
          message: "You can't edit a data that is already done!",
          showError: true,
        };
      });
    }

    setOpenEditForm((prevState) => !prevState);
  };

  const editChangeHandler = (e: ChangeEvent) => {
    const currentEdit = e.target as HTMLTextAreaElement;
    const userEditData = currentEdit.value;

    if (editData.editedTodo) {
      setEditError((prevState) => {
        return { ...prevState, message: '', showError: false };
      });
    }

    setEditData((prevState) => {
      return {
        ...prevState,
        renderTodo: userEditData,
        editedTodo: userEditData,
      };
    });
  };

  const editSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    // Throws an error if edit todo is empty
    if (editData.editedTodo.trim().length === 0) {
      return setEditError((prevState) => {
        return {
          ...prevState,
          message: "You can't submit an empty input!",
          showError: true,
        };
      });
    }

    // Copy the edited object and put the new todo
    const editedTodo: TodosObj = {
      ...todoData,
      todo: editData.editedTodo,
    };

    setEditError((prevState) => {
      return { ...prevState, message: '', showError: false };
    });
    setEditData((prevState) => {
      return { ...prevState, originalTodo: editData.editedTodo };
    });

    // Update the edit todo in the LocalDB
    todoCtx.editTodo(editedTodo);
    setOpenEditForm(false);
  };

  // Delete Functionality
  const deleteHandler = () => {
    todoCtx.removeTodo(id);
  };

  const listContent = openEditForm ? (
    <form className="flex items-center justify-start gap-6">
      <textarea
        value={editData.renderTodo}
        className="resize-none rounded-lg p-2 my-2"
        rows={4}
        onChange={editChangeHandler}
      />
      <TodoButton handler={editSubmitHandler}>
        <SaveIcon className="h-5 w-5 sm:h-7 sm:w-7  group-hover:fill-white transition-all duration-300 group-disabled:fill-white" />
      </TodoButton>
    </form>
  ) : (
    todo
  );

  const listEditError = editError.showError && (
    <p className="text-warningFont text-lg absolute lg:bottom-0 lg:left-0 lg:ml-4">
      {editError.message}
    </p>
  );

  return (
    // TODO Animate y-100 to y-0 and opacity 0 to opacity 1 ocrhestration stagger children
    <div className="relative flex flex-col gap-5 w-full border-b-2 border-primaryTint2 py-4 sm:flex-row sm:justify-between sm: items-center lg:gap-0">
      <li
        className={`${strikeTodo} relative list-none break-all mx-4 sm:ml-4 sm:mx-0 sm:w-full`}
      >
        {/* TODO Animate Presence and Exit*/}
        {listContent}
      </li>
      {/* TODO Fade Animation and Exit */}
      {listEditError}
      <div className="flex justify-center w-full gap-5 sm:justify-end sm:mr-4">
        {/* Button Springy effect animation */}
        <TodoButton handler={doneHandler} disableButton={openEditForm}>
          <CheckIcon className="h-5 w-5 sm:h-7 sm:w-7  group-hover:fill-white transition-all duration-300 group-disabled:fill-white" />
        </TodoButton>
        <TodoButton handler={showEditInputHandler}>
          <PencilIcon className="h-5 w-5 sm:h-7 sm:w-7  group-hover:fill-white transition-all duration-300 group-disabled:fill-white" />
        </TodoButton>
        <TodoButton handler={deleteHandler}>
          <TrashIcon className="h-5 w-5 sm:h-7 sm:w-7  group-hover:fill-white transition-all duration-300" />
        </TodoButton>
      </div>
    </div>
  );
};

export default Todo;
