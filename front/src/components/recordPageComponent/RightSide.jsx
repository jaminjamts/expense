"use client";
import { BACKEND_ENDPOINT } from "@/constants/Constants";
import { ListItem } from "../ListItem";
import { useEffect, useState } from "react";

export const RightSide = ({ userID }) => {
  const [transactionData, setTransactionData] = useState([]);

  const fetchTransactionData = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ user_id: userID }),
      };

      const response = await fetch(`${BACKEND_ENDPOINT}/transactions`, options);
      const data = await response.json();
      setTransactionData(data?.data);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  };

  useEffect(() => {
    if (userID) {
      fetchTransactionData();
    }
  }, [userID]);

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
        {transactionData?.length > 0 ? (
          transactionData?.map((data, index) => (
            <div key={index}>
              <ListItem data={data} />
            </div>
          ))
        ) : (
          <p>No transactions for today.</p>
        )}
      </div>
    </main>
  );
};
