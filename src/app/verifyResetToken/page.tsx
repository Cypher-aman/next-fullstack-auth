"use client";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const VerifyResetToken = () => {
  const [token, setToken] = useState("");
  const params = useSearchParams();
  const [reset, setReset] = useState(false);
  const router = useRouter();
  const handleReset = async () => {
    try {
      console.log("clicked");
      const res = await axios.put("/api/user/resetpassword", { token });
      toast.success("Password Reset Successfull");
      console.log(res.data);
      setReset(true);
      router.push("/login");
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
      handleReset();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center">
      <Toaster />
      <h1 className="text-4xl">User Verify Page</h1>
      {reset ? (
        <h2>Password Reset Successfull</h2>
      ) : (
        <h2>Password Not Reset</h2>
      )}
    </div>
  );
};

export default VerifyResetToken;
