"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
// import { verifyUser } from "@/helper/verifyUserEmail";

const SignupPage = function () {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignup = async (e: any) => {
    e.preventDefault();
    try {
      const res: any = await axios.post("/api/user/signup", userInfo);
      const user = res.data;
      console.log(user);

      toast.success("Signup successful!");
      setUserInfo({ email: "", password: "", username: "" });

      // send email to verify user

      router.push("/login");
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center p-24 min-h-screen ">
      <Toaster />
      <h1 className="text-5xl m-5">Signup Page</h1>
      <form onSubmit={onSignup} className="flex flex-col ">
        <label className="mb-2" htmlFor="username">
          Username
        </label>
        <input
          className="mb-2 p-2 rounded h-12 text-black"
          type="text"
          name="username"
          value={userInfo.username}
          placeholder="Username"
          onChange={(e) =>
            setUserInfo({ ...userInfo, username: e.target.value })
          }
        />
        <label className="mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="mb-2 p-2 rounded h-12 text-black"
          type="email"
          name="email"
          value={userInfo.email}
          placeholder="email"
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        />
        <label className="mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="mb-2 p-2 rounded h-12 text-black"
          type="password"
          name="password"
          value={userInfo.password}
          placeholder="password"
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />
        <button type="submit" className="my-2 p-2 rounded h-12 bg-orange-500">
          Signup
        </button>
        <p>
          Already have an account. &nbsp;
          <Link className="underline" href="/login">
            Click here to login
          </Link>
        </p>
      </form>
    </main>
  );
};

export default SignupPage;
