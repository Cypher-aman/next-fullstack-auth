"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ResetPassword = function () {
  const [reset, setReset] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log("data sending: ", reset);
      const res = await axios.post("/api/user/resetpassword", reset);
      console.log(res.data);

      toast.success("Password reset email sent");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setReset({ email: "", password: "" });
    }
  };

  return (
    <main className="flex flex-col items-center justify-center p-24 min-h-screen">
      <Toaster />
      <h1 className="text-5xl m-5">Reset Password</h1>
      <form onSubmit={onSubmit} className="flex flex-col">
        <label className="mb-2" htmlFor="email">
          Email
        </label>
        <input
          value={reset.email}
          onChange={(e) => setReset({ ...reset, email: e.target.value })}
          className="mb-2 p-2 rounded h-12 text-black"
          type="email"
          name="email"
          required
        />
        <label className="mb-2" htmlFor="password">
          New Password
        </label>
        <input
          value={reset.password}
          onChange={(e) => setReset({ ...reset, password: e.target.value })}
          className="mb-2 p-2 rounded h-12 text-black"
          type="password"
          name="password"
          required
        />
        <button className="my-2 p-2 rounded h-12 bg-orange-500" type="submit">
          Reset Password
        </button>
      </form>
    </main>
  );
};

export default ResetPassword;
