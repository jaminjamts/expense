"use client";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { ListItem } from "../components/ListItem";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_ENDPOINT } from "@/constants/Constants";
import {
  BarChart,
  ExpMonthCard,
  IncMonthCard,
  PieChart,
} from "@/components/dashboardPageComponent";

export default function Dashboard() {
  const router = useRouter();
  const [userID, setUserID] = useState();
  const [userDatas, setUserDatas] = useState([]);

  const fetchdatas = async () => {
    if (!userID) return;
    try {
      const response = await fetch(
        `${BACKEND_ENDPOINT}/transactions?userID=${userID}`
      );
      const datas = await response?.json();
      setUserDatas(datas.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserData = window.localStorage?.getItem("userId");
      if (storedUserData) {
        setUserID(storedUserData);
      }
      if (!storedUserData) {
        toast.warning("Please sign in");
        router.push("/");
      }
    }
    fetchdatas();
  }, [userID]);

  return (
    <main className="w-screen flex flex-col justify-center items-center bg-[#BBA58F]">
      {/* /////////////////// */}
      <Navbar userID={userID} />
      {/* /////////////////////// */}
      <div className="flex justify-between flex-col max-w-6xl container p-4 gap-4">
        <div className="grid grid-cols-3 gap-4">
          {/* card */}
          <div className="card  bg-gradient-to-tr from-slate-800 to-slate-600 min-h-40  shadow-xl rounded-2xl">
            <div className="card-body p-10 flex flex-col justify-between h-full">
              <p className="text-[#fff]">
                BALANCE <sup>&#174;</sup>
              </p>
              <h2 className="card-title text-2xl font-thin  text-gray-300">
                Cash
              </h2>
              <p className="text-gray-200 text-3xl">100000$</p>
            </div>
          </div>
          <IncMonthCard userID={userID} />
          <ExpMonthCard userID={userID} />
        </div>
        {/* charts */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card bg-base-100 p-2  shadow-xl rounded-2xl h-[300px] bg-[#EFEFE9]">
            <BarChart userID={userID} />
          </div>
          {/*  */}
          <div className="card bg-base-100 p-2 shadow-xl rounded-2xl h-[300px] bg-[#EFEFE9]">
            <PieChart userID={userID} />
          </div>
        </div>
        <div className="w-full p-4">
          <h3 className="font-bold text-2xl p-4 ">Last Record</h3>
          <div className=" flex flex-col gap-2">
            {userDatas &&
              userDatas.map((data, index) => {
                return (
                  <div key={index}>
                    <ListItem data={data} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
}
