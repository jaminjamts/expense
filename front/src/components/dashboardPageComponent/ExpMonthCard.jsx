"use client";
import { BACKEND_ENDPOINT } from "@/constants/Constants";
import { DecreaseIcon, DotIcon } from "@/icons";
import { useEffect, useState } from "react";

export const ExpMonthCard = ({ userID }) => {
  const [data, setData] = useState([]);
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 30);
  const monthDatas = async () => {
    if (!userID) return;
    try {
      const response = await fetch(
        `${BACKEND_ENDPOINT}/monthTransactions?userID=${userID}&types=EXP&start=${start.toISOString()}`
      );
      const datas = await response?.json();
      setData(datas);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    monthDatas();
  }, [userID]);
  return (
    <main className=" bg-[#EFEFE9] bg-gradient-to-tr from-inherit to-[#c7c7c3] shadow-xl rounded-2xl min-h-56 h-full">
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center gap-2  border-b border-[#c3c3c3] p-4 pb-0 h-1/4">
          <DotIcon color={"#0166FF"} />
          <h2 className=" text-base font-semibold">Your DECREASE</h2>
        </div>

        {data.map((data, index) => {
          return (
            <div key={index} className="flex flex-col gap-4 px-4 py-8 ">
              <div>
                <h1 className="text-4xl font-semibold">{data.sum}$</h1>
                <p className="text-[#aaa]">Your DECREASE Amount</p>
              </div>
              <div className="flex gap-2">
                <DecreaseIcon />
                {data.percentage}% from LAST month
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};
