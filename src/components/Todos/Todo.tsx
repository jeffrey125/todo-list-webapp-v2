type TodoProps = {
  todo: string;
};

const Todo = ({ todo }: TodoProps) => {
  return (
    <div className="flex justify-between items-center w-full h-16 border-b-[1px] border-black">
      <li className="list-none">{todo}</li>
      <div className="flex gap-5 mr-5">
        <button className="text-xl border-none h-8 w-20 rounded-2xl bg-palette1 transition-all duration-300 hover:text-white hover:bg-palette1Shade hover:shadow focus:text-white focus:bg-palette1Shade focus:shadow active:text-white active:bg-palette1Shade active:shadow ">
          Done
        </button>
        <button className="text-xl border-none h-8 w-20 rounded-2xl bg-palette1 transition-all duration-300 hover:text-white hover:bg-palette1Shade hover:shadow focus:text-white focus:bg-palette1Shade focus:shadow active:text-white active:bg-palette1Shade active:shadow ">
          Edit
        </button>
        <button className="text-xl border-none h-8 w-20 rounded-2xl bg-palette1 transition-all duration-300 hover:text-white hover:bg-palette1Shade hover:shadow focus:text-white focus:bg-palette1Shade focus:shadow active:text-white active:bg-palette1Shade active:shadow ">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
