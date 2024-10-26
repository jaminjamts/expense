"use client";

import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { ListItem } from "../components/ListItem";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { lastmonth, listdatas } from "@/datas/datas";

export default function Dashboard() {
  const router = useRouter();
  // const userid = localStorage.getItem("userId");
  // console.log(userid);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userId");
    if (!storedUserData) {
      toast.warning("Please sign in");
      router.push("/");
    }
  }, [router]);

  return (
    <main className="w-screen flex  flex-col justify-center items-center ">
      {/* /////////////////// */}
      <Navbar />
      {/* /////////////////////// */}
      <div className="flex justify-between flex-col max-w-6xl container p-4 gap-4">
        <div className="grid grid-cols-3 gap-4">
          {/* card */}
          <div className="card bg-slate-800 h-52  shadow-xl rounded-2xl">
            <div className="card-body p-10 flex flex-col justify-between h-full">
              <h2 className="card-title text-2xl font-thin  text-gray-300">
                Cash
              </h2>
              <p className="text-gray-200 text-3xl">100000$</p>
            </div>
          </div>
          {/* income */}
          <div className="card bg-base-100 h-52  shadow-xl rounded-2xl">
            <div className="card-body flex flex-col justify-between h-full">
              <div className="border-b ">
                <h2 className="card-title p-4 ">Youre Income</h2>
              </div>
              <div className="p-4">
                <p>{lastmonth.incomeTotal}</p>
                <p>Your income Amount</p>
              </div>
              <div className="card-actions justify-end p-4">
                <p>{lastmonth.increse}% from Last month</p>
              </div>
            </div>
          </div>
          {/* expense */}
          <div className="card bg-base-100 h-52  shadow-xl rounded-2xl">
            <div className="card-body flex flex-col justify-between h-full">
              <div className="border-b">
                <h2 className="card-title p-4">Your Expenses</h2>
              </div>
              <div className="p-4">
                <p>-{lastmonth.expenseTotal}</p>
                <p>Your expences Amount</p>
              </div>
              <div className="card-actions justify-end p-4">
                <p>{lastmonth.decrease}% from Last month</p>
              </div>
            </div>
          </div>
        </div>
        {/* charts */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card bg-base-100 h-52  shadow-xl rounded-2xl">
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="card bg-base-100 h-52  shadow-xl rounded-2xl">
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-4">
          <h3 className="font-bold text-2xl p-4 ">Last Record</h3>
          <div className=" flex flex-col gap-2">
            {listdatas.map((data, index) => {
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
