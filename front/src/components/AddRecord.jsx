import { BACKEND_ENDPOINT } from "@/constants/Constants";
import { useState, useEffect } from "react";

export const AddRecord = ({ recordHandler, userID }) => {
  const [transaction, setTransaction] = useState({});
  const [transactionType, setTransactionType] = useState("INC");
  const [categories, setCategories] = useState([]);

  const fetchCategoriesData = async () => {
    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/categories/${userID}`);
      const data = await response?.json();
      setCategories(data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const toggleTransactionType = (type) => {
    setTransactionType(type);
  };

  const handleRecordDatas = (event) => {
    const { name, value } = event.target;
    setTransaction((prev) => ({
      ...prev,
      [name]: value,
      user_id: Number(userID),
      transaction_type: transactionType,
    }));
  };

  const sendRecordData = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      };

      const response = await fetch(`${BACKEND_ENDPOINT}/transaction`, options);
      const data = await response.json();
      recordHandler();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (userID) {
      fetchCategoriesData();
    }
  }, [userID]);

  return (
    <div
      onClick={recordHandler}
      className="absolute top-0 left-0 flex-col w-screen h-screen flex items-center justify-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className=" bg-slate-100 p-4 rounded-2xl "
      >
        <h3 className="border-b">Add RECORD</h3>
        <div className="flex flex-col gap-2 p-2">
          <div className="flex w-full  rounded-3xl bg-gray-400">
            <button
              className={`w-1/2 text-center font-semibold rounded-3xl py-2 ${
                transactionType === "INC"
                  ? "bg-green-500 text-white"
                  : "bg-gray-400 text-gray-600"
              }`}
              onClick={() => {
                toggleTransactionType("INC");
              }}
            >
              Income
            </button>
            <button
              className={`w-1/2 text-center font-semibold rounded-3xl py-2 ${
                transactionType === "EXP"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-400 text-gray-600"
              }`}
              onClick={() => {
                toggleTransactionType("EXP");
              }}
            >
              Expense
            </button>
          </div>
          {/*  */}
          <div className="flex gap-2 h-1/2">
            <div className="flex flex-col gap-2 h-full">
              <label
                htmlFor="amount"
                className="border flex flex-col px-4 py-2 rounded-lg bg-slate-200"
              >
                Amount
                <input
                  className="bg-slate-200  rounded-md px-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  name="amount"
                  placeholder="$00"
                  type="number"
                  onChange={handleRecordDatas}
                />
              </label>
              <label htmlFor="category" className="flex flex-col">
                Category
              </label>
              <select
                name="category_id"
                className="border flex flex-col w-full p-2 rounded-lg bg-slate-200"
                defaultValue="default"
                onChange={handleRecordDatas}
              >
                <option value="default" hidden>
                  Choose
                </option>
                {categories.map((category, index) => {
                  return (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>

              <input
                onChange={handleRecordDatas}
                className="border  w-full p-2 rounded-lg bg-slate-200"
                name="createdat"
                type="date"
                defaultValue={new Date().setFullYear}
              />
            </div>
            <div className="flex flex-col gap-2 h-full">
              <input
                className="border rounded-md p-2 bg-slate-200 h-1/4"
                onChange={handleRecordDatas}
                name="name"
                placeholder="Payee"
                type="text"
              />
              <textarea
                onChange={handleRecordDatas}
                className="border resize-none rounded-lg p-2 bg-slate-200 h-[145px]"
                name="description"
                placeholder="Write here"
              />
            </div>
          </div>
        </div>
        <button
          className={`w-full text-center font-semibold rounded-3xl py-2 ${
            transactionType === "EXP"
              ? "bg-blue-500 text-white"
              : "bg-green-500 text-white"
          }`}
          onClick={sendRecordData}
        >
          Add Record
        </button>
      </div>
    </div>
  );
};
