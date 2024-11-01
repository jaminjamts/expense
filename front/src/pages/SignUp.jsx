"use client";

import { BACKEND_ENDPOINT } from "@/constants/Constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SignUp() {
  const [newUser, setNewUser] = useState();
  const router = useRouter();

  const handleInputValue = (event) => {
    const { name, value } = event.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const fetchNewUserData = async () => {
    if (newUser.name == "") {
      return toast.warning("Please enter a name");
    } else if (newUser.email == "") {
      return toast.warning("Please enter email");
    } else if (newUser.password == "") {
      return toast.warning("Please enter a password");
    } else if (newUser.password !== newUser.repassword) {
      return toast.warning("Comfirm password is incorrect");
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
    <main className="w-screen h-screen bg-[#7F6951] flex items-center">
      <div className="flex w-1/2 h-full justify-center items-center text-center bg-white">
        <div className="flex flex-col gap-4  max-w-[800px]">
          <div className="flex justify-center items-center flex-col">
            <img src="./logo.png" alt="company logo" width={"150px"} />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <p className="text-base">Welcome back, Please enter your details</p>
          </div>
          <div className="flex flex-col gap-2">
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
              className="bg-[#2a2a2a] rounded-md p-2 text-white"
            >
              Submit
            </button>
          </div>
          <p>
            Already have account?{" "}
            <Link href="/">
              <button className="text-blue-600 font-normal">Log in</button>
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
