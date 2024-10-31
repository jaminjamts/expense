import { BACKEND_ENDPOINT } from "@/datas/datas";
import { useState, useEffect } from "react";

export const AddRecord = ({ recordHandler }) => {
  const [transaction, setTransaction] = useState({});

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const handleRecordDatas = (event) => {
    const { name, value } = event.target;
    setTransaction((prev) => ({ ...prev, [name]: value, user_id }));
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
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {}, []);

  return (
    <div
      onClick={recordHandler}
      className="absolute top-0 left-0 flex-col w-screen h-screen flex items-center justify-center"
    >
      <div
        onClick={stopPropagation}
        className="w-1/2 bg-cyan-500 p-4 rounded-2xl max-w-96"
      >
        <h3 className="border-b">Add RECORD</h3>
        <div className="flex flex-col gap-2 p-2">
          <select
            name="transaction_type"
            className="flex px-4 py-2 rounded-md"
            onChange={handleRecordDatas}
            defaultValue="INC"
            required
          >
            <option value={"INC"}>Income</option>
            <option value={"EXP"}>Expense</option>
          </select>
          <label
            htmlFor="amount"
            className="border flex flex-col px-4 py-2 rounded-lg bg-slate-200"
          >
            Amount
            <input
              className="border bg-slate-200"
              name="amount"
              placeholder="$00"
              type="number"
              onChange={handleRecordDatas}
            />
          </label>
          <label htmlFor="category" className="flex flex-col px-4">
            Category
          </label>
          <select
            name="category_id"
            className="border flex flex-col px-4 py-2 rounded-lg bg-slate-200"
            defaultValue="default"
            onChange={handleRecordDatas}
          >
            <option value="default" hidden>
              Choose
            </option>
            <option value="4">food</option>
            {/* Add additional options here */}
          </select>

          <input
            onChange={handleRecordDatas}
            className="border"
            name="createdat"
            type="date"
          />

          <input
            className="border"
            onChange={handleRecordDatas}
            name="name"
            placeholder="Payee"
            type="text"
          />
          <textarea
            onChange={handleRecordDatas}
            className="border"
            name="description"
            placeholder="Write here"
          />
        </div>
        <button onClick={sendRecordData}>Add Record</button>
        <button onClick={recordHandler}>Close</button>
      </div>
    </div>
  );
};
