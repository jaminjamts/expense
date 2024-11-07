import { BACKEND_ENDPOINT, Colors, Icons } from "@/constants/Constants";
import { HomeIcon } from "@/icons";

import { useEffect, useState } from "react";

export const AddCategory = ({ categoryHandler, setCategories, userID }) => {
  const [selectedIconId, setSelectedIconId] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [name, setName] = useState("");
  const [categoriesVisible, setCategoriesVisible] = useState(false);

  const handleIconSelect = (iconId) => {
    setSelectedIconId(iconId);
  };

  const handleColorSelect = (colorValue) => {
    setSelectedColor(colorValue);
  };

  const categoryNameHandler = (event) => {
    setName(event.target.value);
  };

  const handleCategoryDropdown = () => {
    setCategoriesVisible(!categoriesVisible);
  };

  const setArray = async () => {
    const newCategory = {
      user_id: Number(userID),
      iconId: selectedIconId,
      color: selectedColor,
      name: name,
    };
    console.log(newCategory);

    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
      };

      const response = await fetch(`${BACKEND_ENDPOINT}/category`, options);
      const iconData = await response.json();
      if (iconData.success == true) {
        alert("icon amjilttai nemegdlee");
      }
      setCategories((prev) => [...prev, newCategory]);
    } catch (error) {
      throw error;
    }

    categoryHandler();
    setSelectedIconId("");
    setSelectedColor("");
    setName("");
  };

  useEffect(() => {}, []);

  return (
    <main
      onClick={categoryHandler}
      className="absolute top-0 left-0 flex justify-center items-center h-screen w-screen"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-[500px] bg-slate-200 rounded-lg p-4 flex flex-col gap-4"
      >
        <div className="border-b">
          <h3>Add Category</h3>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col ">
            <div className="flex gap-4">
              <button className="p-2" onClick={handleCategoryDropdown}>
                <HomeIcon color={"black"} />
              </button>
              <label htmlFor="name">
                <input
                  onChange={categoryNameHandler}
                  type="text"
                  name="name"
                  placeholder="New Category Name"
                  className="p-2 rounded-md w-full"
                />
              </label>
            </div>

            <div className="flex justify-center items-center w-full">
              <button
                className="bg-green-400 text-white rounded-xl w-full py-2"
                onClick={setArray}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="relative flex flex-col">
          <div className="absolute left-[-full]">
            {categoriesVisible && (
              <div className="flex gap-4 flex-col max-w-[500px]">
                <div className="flex gap-4">
                  {Icons.map((icon) => (
                    <button
                      onClick={() => handleIconSelect(icon.id)}
                      key={icon.id}
                      className={`p-2 rounded w-6 h-6  ${
                        selectedIconId === icon.id ? "bg-gray-300 w-6 h-6" : ""
                      }`}
                    >
                      {icon.icon}
                    </button>
                  ))}
                </div>
                <div className="flex gap-4 p-2">
                  {Colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => handleColorSelect(color.value)}
                      className={`rounded-full w-6 h-6 ${
                        selectedColor === color.value ? "outline" : ""
                      }`}
                      style={{ backgroundColor: color.value }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
