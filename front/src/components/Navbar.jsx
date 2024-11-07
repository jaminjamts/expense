"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AddRecord } from "./AddRecord";

export default function Navbar({ userID, categories }) {
  const [visible, setVisible] = useState(false);
  const [logOutModal, setLogOutModal] = useState(false);
  const handleLogOut = () => {
    setLogOutModal(!logOutModal);
  };

  const logout = () => {
    localStorage.clear();
  };

  const recordHandler = () => {
    setVisible(!visible);
  };

  return (
    <div className="flex justify-between w-full max-w-6xl px-4">
      <div className="flex gap-4 p-2 items-center">
        <Link href={"/dashboard"}>Dashboard</Link>
        <Link href={"/record"}>Record</Link>
      </div>
      <div>
        <img src="./logo-slim.png" alt="logo" width={"100px"} />
      </div>
      <div className="flex justify-center items-center gap-4">
        <div className="bg-[#3A2D28] rounded-3xl h-8 flex justify-center items-center text-[#fff] px-3 ">
          <button
            onClick={recordHandler}
            className="button bg-[var(--blue)] p-2 rounded-2xl"
          >
            + record
          </button>
        </div>
        {visible && <AddRecord recordHandler={recordHandler} userID={userID} />}
        {/* <img src="./" alt="profile img" width={"20px"} /> */}
        <button onClick={handleLogOut}>Logout</button>
        {logOutModal && (
          <div className="flex gap-4">
            <Link href={"/"}>
              <button onClick={logout}>Yes</button>
            </Link>
            <button onClick={handleLogOut}>No</button>
          </div>
        )}
      </div>
    </div>
  );
}
