"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import Load from "@/components/Load";
import { BACKEND_ENDPOINT } from "@/constants/Constants";

export default function SignIn() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const userInputData = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const fetchSignIn = async () => {
    setIsLoading(false);
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };

      const response = await fetch(`${BACKEND_ENDPOINT}/sign-in`, options);
      const userData = await response.json();
      if (userData.success === "true") {
        window.localStorage.setItem("userId", JSON.stringify(userData.data));
        router.push("/dashboard");
      } else if (userData) {
        toast.error(userData.message);
      }
      setIsLoading(true);
    } catch (error) {
      console.error("Error during sign-in", error);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    setIsLoading(false);
    const userId = localStorage.getItem("userId");
    if (userId) {
      toast.success("You are already signed in");
      router.push("/dashboard");
    }
  }, [router, isLoading]);

  if (isLoading === true) {
    return <Load />;
  } else {
    return (
      <main className="w-screen h-screen flex flex-col gap-4 justify-center items-center">
        <div className="flex justify-center text-center flex-col items-center gap-6">
          <div>
            <img src="./logo.png" alt="company logo" width={"150px"} />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <p className="text-base">Welcome back, Please enter your details</p>
          </div>
          <div className="flex flex-col gap-2 max-w-[800px]">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              className="border rounded p-2"
              onChange={userInputData}
            />

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="border rounded p-2"
              onChange={userInputData}
            />
            <div className="flex bg-[#2a2a2a] py-2 justify-center text-white rounded-2xl cursor-pointer">
              <button onClick={fetchSignIn}>Sign in</button>
            </div>
          </div>
          <div className="flex justify-center w-full gap-2">
            <p>Dont have account?</p>
            <Link href="/sign-up">
              <button className="text-blue-600">Sign Up</button>
            </Link>
          </div>
        </div>
      </main>
    );
  }
}
