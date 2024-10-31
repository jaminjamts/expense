import { useState } from "react";
import { Categories } from "../Category";
import { AddRecord } from "../AddRecord";
import { AddCategory } from "../AddCategory";

export const LeftSide = () => {
  const [visible, setVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);

  const categoryHandler = () => {
    setCategoryVisible(!categoryVisible);
  };
  const recordHandler = () => {
    setVisible(!visible);
  };
  return (
    <div className="flex flex-col gap-6 p-4">
      <h3>Records</h3>
      <div className="">
        <button
          className="bg-blue-600 rounded-lg text-white w-full"
          onClick={recordHandler}
        >
          + Add
        </button>
        {visible && <AddRecord recordHandler={recordHandler} />}
      </div>
      <div className="">
        <input
          type="text"
          placeholder="Search"
          className="rounded-xl p-2 w-full"
        />
      </div>
      <div className="flex flex-col gap-3">
        <h3>Types</h3>
        <div className="flex flex-col gap-2">
          <label htmlFor="all">
            <input type="radio" value="all" name="types" />
            All
          </label>
          <label htmlFor="income">
            <input type="radio" value="income" name="types" />
            Income
          </label>
          <label htmlFor="expense">
            <input type="radio" value="expense" name="types" />
            Expence
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3>Category</h3>

        <div>
          <button onClick={categoryHandler}>+ Add Category</button>
          {categoryVisible && <AddCategory categoryHandler={categoryHandler} />}
        </div>
      </div>
    </div>
  );
};
