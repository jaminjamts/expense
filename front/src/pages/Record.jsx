"use client";
import Navbar from "@/components/Navbar";
import { LeftSide } from "@/components/recordPageComponent/LeftSide";
import { RightSide } from "@/components/recordPageComponent/RightSide";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function RecordPage() {
  const [userId, setUserID] = useState();
  const router = useRouter();
  const storedUserData = localStorage?.getItem("userId");

  useEffect(() => {
    if (storedUserData) {
      setUserID(storedUserData);
    }
    if (!storedUserData) {
      toast.warning("Please sign in");
      router.push("/");
    }
  }, [storedUserData]);

  return (
    <main className="w-screen flex flex-col items-center bg-slate-200 h-full min-h-screen gap-8">
      <Navbar userId={userId} />
      <div className="max-w-6xl container flex gap-6">
        <div className="w-1/3 border rounded-xl bg-slate-50">
          <LeftSide userId={userId} />
        </div>
        <div className="w-2/3 border rounded-xl bg-slate-50">
          <RightSide userId={userId} />
        </div>
      </div>
    </main>
  );
}
