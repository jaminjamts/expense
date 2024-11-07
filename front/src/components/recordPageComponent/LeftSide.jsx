import { useEffect, useState } from "react";
import { AddRecord } from "../AddRecord";
import { AddCategory } from "../AddCategory";
import { HomeIcon, HouseLineIcon, LeapIcon } from "@/icons";
import { IoIosEye } from "react-icons/io";

export const LeftSide = ({
  userID,
  categories,
  setCategories,
  setTypes,
  checkedCategory,
}) => {
  const [visible, setVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);
  const typesGetValue = (e) => {
    setTypes(e);
  };
  const [icons, setIcons] = useState([
    { id: 1, Icon: HomeIcon },
    { id: 2, Icon: HouseLineIcon },
    { id: 3, Icon: LeapIcon },
  ]);

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
        {visible && <AddRecord recordHandler={recordHandler} userID={userID} />}
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
            <input
              defaultChecked
              type="radio"
              onClick={() => {
                typesGetValue("ALL");
              }}
              name="types"
            />
            All
          </label>
          <label htmlFor="income">
            <input
              type="radio"
              onClick={() => {
                typesGetValue("INC");
              }}
              name="types"
            />
            Income
          </label>
          <label htmlFor="expense">
            <input
              type="radio"
              onClick={() => {
                typesGetValue("EXP");
              }}
              name="types"
            />
            Expense
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3>Category</h3>
        <div>
          {categories?.map((category, index) => {
            return (
              <div
                key={index}
                className="flex justify-between gap-2 items-center border-b-2"
              >
                <div className="flex gap-4 items-center">
                  <IoIosEye />
                  <span>{category.name}</span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    onChange={() => {
                      checkedCategory(category.name);
                    }}
                  />
                </div>
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
