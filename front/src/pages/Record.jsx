"use client";
import Navbar from "@/components/Navbar";
import { RecordPopup } from "@/components/RecordPopup";
import { useState } from "react";

export default function RecordPage() {
  const [visible, setVisible] = useState(false);
  const recordHandler = () => {
    setVisible(!visible);
  };
  return (
    <main className="w-screen flex justify-center flex-col">
      <Navbar />
      <div className="max-w-6xl container flex gap-6 p-4">
        <div className="w-1/3 border rounded-xl">
          <h3>Records</h3>
          <button onClick={recordHandler}>Add Record</button>
          {visible ? <RecordPopup /> : <div></div>}
        </div>
        <div className="w-2/3 border rounded-xl"></div>
      </div>
    </main>
  );
}
