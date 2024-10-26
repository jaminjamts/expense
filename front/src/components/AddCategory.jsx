export const AddCategory = ({ categoryHandler }) => {
  return (
    <main
      onClick={categoryHandler}
      className="absolute top-0 left-0 flex justify-center items-center h-screen w-screen"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="w-1/2 bg-slate-200 rounded-lg p-4 flex flex-col gap-4"
      >
        <h3>Add Category</h3>
        <select name="" id="">
          <option value=""></option>
        </select>
        <label htmlFor="name">
          <input type="text" name="categoryName" />
        </label>
        <div className="flex justify-center items-center w-full">
          <button className="flex bg-green-400 text-white rounded-xl w-full justify-center">
            Add
          </button>
        </div>
      </div>
    </main>
  );
};
