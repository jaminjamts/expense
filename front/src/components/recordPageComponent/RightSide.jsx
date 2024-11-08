"use client";

import { ListItem } from "../ListItem";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export const RightSide = ({
  transactionData,
  selectedCategory,
  handleOrder,
  order,
}) => {
  const [filteredCategoryData, setfilteredCategoryData] = useState([]);

  const handleData = () => {
    if (selectedCategory) {
      const selectedData = transactionData.filter((data) => {
        return selectedCategory.some((category) => data.name === category.name);
      });
      setfilteredCategoryData(selectedData);
    }
  };

  useEffect(() => {
    handleData();
  }, [selectedCategory]);

  return (
    <main className="w-full flex flex-col gap-4 p-4">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <button>
            <FaChevronLeft />
          </button>
          <h2>Last month</h2>
          <button>
            <FaChevronRight />
          </button>
        </div>
        <div>
          <select defaultValue={order} className="p-4 rounded-xl">
            <option value={"ASC"} onClick={handleOrder}>
              Newest first
            </option>
            <option value={"DESC"} onClick={handleOrder}>
              Oldest first
            </option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3>Today</h3>
        <div className="flex flex-col gap-2">
          {selectedCategory.length > 0 ? (
            filteredCategoryData.map((data, index) => {
              return (
                <div key={index}>
                  <ListItem data={data} />
                </div>
              );
            })
          ) : transactionData?.length > 0 ? (
            transactionData?.map((data, index) => (
              <div key={index}>
                <ListItem data={data} />
              </div>
            ))
          ) : (
            <p>No transactions for today.</p>
          )}
        </div>
      </div>
    </main>
  );
};
