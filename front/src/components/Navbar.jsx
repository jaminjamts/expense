"use client";
import { useState } from "react";
import Link from "next/link";
import { AddRecord } from "./AddRecord";

export default function Navbar() {
  const [visible, setVisible] = useState(false);

  const recordHandler = () => {
    setVisible(!visible);
  };
  return (
    <div className="flex justify-between w-full container max-w-6xl p-4">
      <div className="flex gap-4 p-2">
        <div>logo</div>
        <Link href={"/dashboard"}>Dashboard</Link>
        <Link href={"/record"}>Record</Link>
      </div>
      <div className="flex gap-4">
        <button
          onClick={recordHandler}
          className="button bg-[var(--blue)] p-2 rounded-2xl"
        >
          + record
        </button>
        {visible && <AddRecord recordHandler={recordHandler} />}
        {/* <img src="" alt="profile img" width={"20px"} /> */}
      </div>
    </div>
  );
}
