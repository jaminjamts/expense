"use client";
import { ListItem } from "../ListItem";
import { useEffect, useState } from "react";

export const RightSide = ({ transactionData, selectedCategory }) => {
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
        <div className="flex gap-2">
          <button>prev</button>
          <h2>Last 30 Days</h2>
          <button>next</button>
        </div>
        <div>
          <select name="" id="" defaultValue={"new"} className="p-4 rounded-xl">
            <option value="new">Newest first</option>
            <option value="old">Oldest first</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3>Today</h3>
        <div>
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
