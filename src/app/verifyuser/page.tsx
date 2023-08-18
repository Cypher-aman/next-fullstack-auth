"use client";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const UserVerify = () => {
  const [token, setToken] = useState("");
  const params = useSearchParams();
  const [isVerified, setIsVerified] = useState(false);
  const handleVerify = async () => {
    try {
      console.log("clicked");
      const res = await axios.put("/api/user/verifyUser", { token });
      toast.success("User Verified");
      console.log(res.data);
      setIsVerified(true);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const query = params.get("token");
    console.log(query);
    if (query) {
      setToken(query.toString());
    }
  }, []);

  useEffect(() => {
    if (token) {
      handleVerify();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center">
      <Toaster />
      <h1 className="text-4xl">User Verify Page</h1>
      {isVerified ? <h2>Email verified</h2> : <h2>Email not verified</h2>}
    </div>
  );
};

export default UserVerify;
