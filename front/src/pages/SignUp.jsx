"use client";

import Load from "@/components/Load";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(true);
  const [newUser, setNewUser] = useState();
  const router = useRouter();
  const BACKEND_ENDPOINT = process.env.API_URL;
  const handleInputValue = (event) => {
    const { name, value } = event.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };
  const fetchNewUserData = async () => {
    if (newUser.password !== newUser.repassword) {
      return alert("Comfirm password is incorrect");
    } else {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        };

        const response = await fetch(`${BACKEND_ENDPOINT}/sign-up`, options);

        const data = await response.json();
        if (data.success === "true") {
          router.push("/");
          toast.success("success");
        } else {
          toast.error(data.message);
        }
      } catch (error) {}
    }
  };
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="flex w-1/2 h-1/2 justify-center items-center">
        <div className="flex flex-col gap-2 max-w-[800px]">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            className="border rounded p-2 "
            onChange={handleInputValue}
          />

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="border rounded p-2 "
            onChange={handleInputValue}
          />

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="border rounded p-2 "
            onChange={handleInputValue}
          />

          <input
            id="repassword"
            name="repassword"
            type="password"
            placeholder="Comfirm Password"
            className="border rounded p-2 "
            onChange={handleInputValue}
          />
          <button
            onClick={fetchNewUserData}
            className="bg-blue-600 rounded-md p-2 text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </main>
  );
}
