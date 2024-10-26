"use client";
import Navbar from "@/components/Navbar";
import { LeftSide } from "@/components/recordPageComponent/LeftSide";
import { RightSide } from "@/components/recordPageComponent/RightSide";

export default function RecordPage() {
  return (
    <main className="w-screen flex flex-col items-center bg-slate-200 h-full min-h-screen">
      <Navbar />
      <div className="max-w-6xl container flex">
        <div className="w-1/3 border rounded-xl bg-slate-50">
          <LeftSide />
        </div>
        <div className="w-2/3 border rounded-xl bg-slate-50">
          <RightSide />
        </div>
      </div>
    </main>
  );
}
