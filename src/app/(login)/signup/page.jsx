"use client";
import ImageUpload from "@/components/ImageUpload";
import { signIn } from "next-auth/react";
import { useState } from "react";

const signup = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
  });
  const [error, setError] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/signup`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
      method: "POST",
    });
    if (!res.ok) {
      const err = await res.json();
      setError(err.error);
    } else {
      const data = await res.json();
      signIn("credentials", {
        email: userInfo.email,
        password: userInfo.password,
        redirect: true,
        callbackUrl: "/",
      })
    
    }
  };

  return (
    <main className="flex justify-center items-center h-full bg-gray-50">
      <form onSubmit={(e)=>submitHandler(e)} className="flex-col p-3  w-[400px] mb-60 ">
        <h1 className="text-center text-6xl mb-10">Sign Up</h1>
        <p
          style={{ display: (error ? "block" : "none") }}
          className="w-full p-2 pl-4 text-lg bg-red-500 rounded-md text-white"
        >
          Error : {error}
        </p>
        <input
          className="block border-2 placeholder:text-black pl-4 my-3 w-full bg-gray-50 p-2 rounded-md h-14 text-lg"
          type="text"
          placeholder="Username"
          onChange={(e) =>
            setUserInfo({ ...userInfo, username: e.target.value })
          }
          required
          minLength={8}
        />
        <input
          className="block border-2 placeholder:text-black pl-4 my-3 w-full bg-gray-50 p-2 rounded-md h-14 text-lg"
          type="email"
          placeholder="Email"
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          required
        />
        <input
          className="block border-2 placeholder:text-black pl-4 my-3 w-full bg-gray-50 p-2 rounded-md h-14 text-lg"
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
          required
          minLength={8}
        />
        <ImageUpload userInfo={userInfo} setUserInfo={setUserInfo} />
        <input
          type="submit"
          className="block border bg-black h-14 text-xl rounded-lg w-full text-center text-white active:bg-gray-50 active:text-black active:border-black"
        />
          
      </form>
    </main>
  );
};

export default signup;
