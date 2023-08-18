"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
const ProfilePage = function () {
  const router = useRouter();
  const [userData, setUserData] = useState<any>({});

  const onLogout = async () => {
    try {
      await axios.get("/api/user/logout");
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerify = async (e: any) => {
    try {
      console.log("clicked");
      const res = await axios.post("/api/user/verifyUser");
      toast.success("Email sent successfully");
      console.log(res.data);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const res = await axios.get("/api/user/userData");
      setUserData(res.data);
      console.log(res.data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center p-24 min-h-screen">
      <Toaster />
      <button
        className="p-2 border border-white fixed top-10 right-10"
        onClick={handleVerify}
      >
        Verify
      </button>
      <h1 className="text-5xl m-5">Profile Page</h1>
      {userData.username && (
        <h2 className="text-5xl m-5 bg-orange-500 p-2 text-black">
          {userData.username}
        </h2>
      )}

      <button
        onClick={onLogout}
        className="text-2xl my-2 p-2 rounded h-12 border border-white bg-transparent"
      >
        Logout
      </button>
    </main>
  );
};

export default ProfilePage;
