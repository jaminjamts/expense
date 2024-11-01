"use client";
import Navbar from "@/components/Navbar";
import { LeftSide } from "@/components/recordPageComponent/LeftSide";
import { RightSide } from "@/components/recordPageComponent/RightSide";
import { BACKEND_ENDPOINT } from "@/constants/Constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function RecordPage() {
  const [userID, setUserID] = useState();
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/categories/${userID}`);
      const data = await response.json();

      setCategories(data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
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
    if (userID) {
      fetchData();
    }
  }, [userID]);

  return (
    <main className="w-screen flex flex-col items-center bg-slate-200 h-full min-h-screen gap-8">
      <Navbar userID={userID} categories={categories} />
      <div className="max-w-6xl container flex gap-6">
        <div className="w-1/3 border rounded-xl bg-slate-50">
          <LeftSide
            userID={userID}
            categories={categories}
            setCategories={setCategories}
          />
        </div>
        <div className="w-2/3 border rounded-xl bg-slate-50">
          <RightSide userID={userID} />
        </div>
      </div>
    </main>
  );
}
