import { useState } from "react";

export const AddRecord = ({ recordHandler }) => {
  const [transaction, setTransaction] = useState({});
  const userId = localStorage.getItem("userId");
  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const handleRecordDatas = (event) => {
    const { name, value } = event.target;
    setTransaction((prev) => ({ ...prev, [name]: value }));
  };
  console.log(userId, transaction);

  const sendRecordData = () => {
    recordHandler(transaction);
  };

  return (
    <div
      onClick={recordHandler}
      className="absolute top-0 left-0 flex-col w-screen h-screen flex items-center justify-center "
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
            id="trans-type"
            defaultValue="INC"
            required
          >
            <option value="INC">Income</option>
            <option value="EXP">Expense</option>
          </select>
          <label
            htmlFor="amount"
            className="border flex flex-col px-4 py-2 rounded-lg bg-slate-200"
          >
            Amount
            <input
              className="border bg-slate-200"
              name="amount"
              placeholder="$ 00"
              type="number"
              onChange={handleRecordDatas}
            />
          </label>
          <label htmlFor="category" className="flex flex-col px-4">
            Category
          </label>
          <select
            name="category"
            className="border flex flex-col px-4 py-2 rounded-lg bg-slate-200"
            defaultValue="default"
            onChange={handleRecordDatas}
          >
            <option value="default" hidden>
              Choose
            </option>
            <option value="food">food</option>
            {/* Add additional options here */}
          </select>

          <input
            onChange={handleRecordDatas}
            className="border"
            name="date"
            type="date"
          />
          <input
            className="border"
            onChange={handleRecordDatas}
            name="time"
            type="time"
          />
          <input
            className="border"
            onChange={handleRecordDatas}
            name="payee"
            placeholder="Payee"
            type="text"
          />
          <textarea
            onChange={handleRecordDatas}
            className="border"
            name="notes"
            placeholder="Write here"
          />
        </div>
        <button onClick={sendRecordData}>Add Record</button>
        <button onClick={recordHandler}>Close</button>
      </div>
    </div>
  );
};
