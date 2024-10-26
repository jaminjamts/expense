"use client";
import { useState } from "react";
import Link from "next/link";
import { RecordPopup } from "./RecordPopup";

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  // const userData = localStorage.getItem("userData");

  const handler = () => {
    setVisible(!visible);
  };
  return (
    <div className="flex justify-between w-full container p-4">
      <div className="flex gap-4 p-2">
        <div>logo</div>
        <Link href={"/dashboard"}>Dashboard</Link>
        <Link href={"/record"}>Record</Link>
      </div>
      <div className="flex gap-4">
        <button
          onClick={handler}
          className="button bg-[var(--blue)] p-2 rounded-2xl"
        >
          aaa
        </button>
        {visible ? <RecordPopup /> : <div className="hidden"></div>}
        <img src="/favicon.ico" alt="profile img" width={"20px"} />
      </div>
    </div>
  );
}
