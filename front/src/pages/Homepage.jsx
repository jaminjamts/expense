"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import Load from "@/components/Load";

export default function SignIn() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const BACKEND_ENDPOINT = process.env.API_URL;
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
        toast.success("Successfully signed in");
        localStorage.setItem("userId", JSON.stringify(userData.data));
        router.push("/dashboard");
      } else if (userData) {
        toast.error(userData.message);
      }
      setIsLoading(true);
    } catch (error) {
      console.error("Error during sign-in", error);
    }
  };

  useEffect(() => {
    setIsLoading(false);
    const userId = localStorage.getItem("userId");
    if (userId) {
      toast.success("You are already signed in");
      router.push("/dashboard");
    }
  }, [router]);

  if (isLoading === true) {
    return <Load />;
  }
  return (
    <main className="w-screen h-screen flex justify-center items-center">
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
        <div className="flex justify-between">
          <Link href="/sign-up">
            <button>Sign Up</button>
          </Link>
          <button onClick={fetchSignIn}>Sign in</button>
        </div>
      </div>
    </main>
  );
}
