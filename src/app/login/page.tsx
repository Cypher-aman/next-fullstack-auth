"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = function () {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const onLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/user/login", userInfo);
      setUserInfo({ email: "", password: "" });
      toast.success("Login successful");
      console.log(response.data);
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center p-24 min-h-screen ">
      <Toaster />
      <h1 className="text-5xl m-5">Login Page</h1>
      <form onSubmit={onLogin} className="flex flex-col ">
        <label className="mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="mb-2 p-2 rounded h-12 text-black"
          type="text"
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
        <Link
          href="/resetPassword"
          className="text-sm text-blue-400 text-right"
        >
          Forgot Password
        </Link>
        <button type="submit" className="my-4 p-2 rounded h-12 bg-orange-500">
          Login
        </button>
        <p>
          Don&rsquo;t have an account. &nbsp;
          <Link className="underline" href="/signup">
            Click here to signup
          </Link>
        </p>
      </form>
    </main>
  );
};

export default LoginPage;
