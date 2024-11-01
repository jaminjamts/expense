import { useEffect, useState } from "react";
import { AddRecord } from "../AddRecord";
import { AddCategory } from "../AddCategory";
import { HomeIcon, HouseLineIcon, LeapIcon } from "@/icons";

export const LeftSide = ({ userID, categories, setCategories }) => {
  const [visible, setVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);

  // Icon mapping
  const icons = [
    { id: 1, Icon: HomeIcon },
    { id: 2, Icon: HouseLineIcon },
    { id: 3, Icon: LeapIcon },
  ];

  const categoryHandler = () => setCategoryVisible(!categoryVisible);
  const recordHandler = () => setVisible(!visible);

  useEffect(() => {}, [userID]);

  return (
    <div className="flex flex-col gap-6 p-4">
      <h3>Records</h3>
      <div>
        <button
          className="bg-blue-600 rounded-lg text-white w-full"
          onClick={recordHandler}
        >
          + Add
        </button>
        {visible && (
          <AddRecord
            recordHandler={recordHandler}
            categories={categories}
            user_id={userID}
          />
        )}
      </div>
      <div>
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
            Expense
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3>Category</h3>
        <div>
          {categories?.map((category, index) => {
            const Icon = icons.find(
              (icon) => icon.id == category?.category_icon
            ).Icon;
            return (
              <div key={index} className="flex items-center gap-2">
                <Icon color={category.icon_color} />
                <span>{category.name}</span>
              </div>
            );
          })}
        </div>
        <div>
          <button onClick={categoryHandler}>+ Add Category</button>
          {categoryVisible && (
            <AddCategory
              categoryHandler={categoryHandler}
              userID={userID}
              setCategories={setCategories}
            />
          )}
        </div>
      </div>
    </div>
  );
};
