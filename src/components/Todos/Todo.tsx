import { useContext, useState, ChangeEvent, FormEvent } from 'react';
import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  SaveIcon,
} from '@heroicons/react/solid';
import {
  AnimatePresence,
  useMotionValue,
  motion,
  Reorder,
} from 'framer-motion';

import { useRaisedShadow } from '../../hooks/use-raised-shadow';
import { TodosObj } from '../../Types/TodosType';
import TodoContext from '../../store/todo-context';
import TodoButton from '../UI/TodoButton';
import MobileEditSaveBTN from '../UI/MobileEditSaveBTN';

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

const formVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.1,
    },
  },
};

const listVariant = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

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
    <motion.form
      key="editForm"
      exit="hidden"
      variants={formVariant}
      className="flex items-center justify-start gap-5"
    >
      <textarea
        data-cy="cy-edit-todo-input"
        value={editData.renderTodo}
        className="resize-none rounded-lg p-2 my-2 w-full lg:w-[80%] transition-colors duration-300outline-primaryColor outline-primaryColor dark:text-lightFontColor dark:bg-[#19364f]"
        rows={4}
        onChange={editChangeHandler}
      />
      <TodoButton
        data-cy="cy-edit-submit-button"
        handler={editSubmitHandler}
        className="hidden lg:flex"
        ariaLabelText="Submit Edited Todo"
      >
        <SaveIcon
          data-cy="cy-edit-submit-icon-button"
          className="h-5 w-5 sm:h-7 sm:w-7 fill-lightFontColor group-hover:fill-fontColor transition-all duration-300 dark:fill-fontColor dark:group-hover:fill-lightFontColor"
        />
      </TodoButton>
    </motion.form>
  ) : (
    <motion.span
      data-cy={`cy-text-${id}`}
      key="listContent"
      exit="hidden"
      variants={formVariant}
    >
      {todo}
    </motion.span>
  );

  const listEditError = editError.showError && (
    <motion.p
      data-cy="cy-list-edit-error"
      key="listError"
      animate="visible"
      initial="hidden"
      exit="hidden"
      variants={formVariant}
      className="text-red-700 text-sm ml-4 sm:absolute sm:bottom-0 sm:left-0"
    >
      {editError.message}
    </motion.p>
  );

  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  // const dragControls = useDragControls();

  return (
    <Reorder.Item
      data-cy={`cy-${id}`}
      value={todoData}
      id={id}
      style={{ y, boxShadow }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.2 }}
      variants={listVariant}
      className="cursor-grab relative flex flex-col list-none w-full border-b-2 border-primaryTint2 py-4 bg-lightFontColor rounded-xl dark:bg-darkPrimary dark:border-darkPallete1 sm:gap-5 sm:flex-row sm:justify-between sm:items-center lg:gap-0 transition-colors duration-300"
    >
      <span
        className={`${strikeTodo} mx-auto sm:relative break-all w-[100%] max-w-[90%] overflow-x-auto text-center sm:text-left sm:ml-4 sm:mx-0 sm:w-full`}
      >
        <AnimatePresence exitBeforeEnter>{listContent}</AnimatePresence>
      </span>
      <span className="h-10 sm:h-0">
        <AnimatePresence exitBeforeEnter>{listEditError}</AnimatePresence>
      </span>

      <div
        data-cy={`cy-actions-${id}`}
        className="flex justify-center w-full gap-3 sm:gap-5 items-center sm:justify-end sm:mr-4"
      >
        {openEditForm && (
          <MobileEditSaveBTN
            data-cy="cy-mobile-edit-submit-button"
            handler={editSubmitHandler}
            className="lg:hidden"
            ariaLabelText="Submit Edited Todo"
          >
            <SaveIcon
              data-cy="c-ymobile-edit-submit-icon-button"
              className="h-5 w-5 sm:h-7 sm:w-7 fill-lightFontColor group-hover:fill-fontColor transition-all duration-300  dark:fill-fontColor dark:group-hover:fill-lightFontColor"
            />
          </MobileEditSaveBTN>
        )}
        <TodoButton
          handler={doneHandler}
          disableButton={openEditForm}
          ariaLabelText="Cross-out Todo"
          data-cy="cy-check-button"
        >
          <CheckIcon className="h-5 w-5 sm:h-7 sm:w-7  fill-lightFontColor group-hover:fill-fontColor transition-all duration-300 group-disabled:fill-fontColor dark:fill-fontColor dark:group-hover:fill-lightFontColor dark:group-disabled:fill-lightFontColor" />
        </TodoButton>
        <TodoButton
          data-cy="cy-open-edit-form"
          handler={showEditInputHandler}
          ariaLabelText="Open Edit Todo Form"
        >
          <PencilIcon className="h-5 w-5 sm:h-7 sm:w-7  fill-lightFontColor group-hover:fill-fontColor transition-all duration-300 dark:fill-fontColor dark:group-hover:fill-lightFontColor" />
        </TodoButton>
        <TodoButton
          data-cy="cy-delete-button"
          handler={deleteHandler}
          ariaLabelText="Delete Todo"
        >
          <TrashIcon className="h-5 w-5 sm:h-7 sm:w-7  fill-lightFontColor group-hover:fill-fontColor transition-all duration-300 dark:fill-fontColor dark:group-hover:fill-lightFontColor" />
        </TodoButton>

        {/* TODO Uncomment this when Framer fix the issue */}
        {/* <SelectorIcon
          className="cursor-grab h-5 w-5 sm:h-7 sm:w-7  fill-lightFontColor"
          onPointerDown={(e) => dragControls.start(e)}
        /> */}
      </div>
    </Reorder.Item>
  );
};

export default Todo;
