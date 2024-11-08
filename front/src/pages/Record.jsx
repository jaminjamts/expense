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
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [types, setTypes] = useState("ALL");
  const [order, setOrder] = useState("ASC");
  const router = useRouter();

  const handleOrder = (e) => {
    setOrder(e.target.value);
  };

  const fetchTransactionData = async () => {
    if (!userID) return;
    try {
      const response = await fetch(
        `${BACKEND_ENDPOINT}/transactions?userID=${userID}&types=${types}&order=${order}`
      );
      const data = await response.json();
      setTransactionData(data?.data);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  };
  //
  const fetchCategoriesData = async () => {
    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/categories/${userID}`);
      const data = await response.json();
      setCategories(data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  //
  const checkedCategory = (name) => {
    setSelectedCategory((prev) => {
      const exists = prev.some((data) => data.name === name);
      if (exists) {
        return prev.filter((data) => data.name !== name);
      } else {
        return [...prev, { name }];
      }
    });
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
      fetchCategoriesData();
    }
    fetchTransactionData();
  }, [userID, types, order]);

  return (
    <main className="w-screen flex flex-col items-center bg-slate-200 h-full min-h-screen gap-8">
      <Navbar userID={userID} categories={categories} />
      <div className="max-w-6xl container flex gap-6">
        <div className="w-1/3 border rounded-xl bg-slate-50">
          <LeftSide
            userID={userID}
            categories={categories}
            setCategories={setCategories}
            setTypes={setTypes}
            types={types}
            checkedCategory={checkedCategory}
          />
        </div>
        <div className="w-2/3 border rounded-xl bg-slate-50">
          <RightSide
            userID={userID}
            transactionData={transactionData}
            selectedCategory={selectedCategory}
            handleOrder={handleOrder}
            order={order}
          />
        </div>
      </div>
    </main>
  );
}
