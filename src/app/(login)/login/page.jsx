"use client"
import googleLogo from "@/../public/google.svg";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {  useRef,useState,useEffect } from "react";
export default function login() {
  const {data : session} = useSession();
  const router = useRouter();
  const userInfo = useRef({email: "",password:""})
  const [error ,setError] = useState({display:"none"});
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({display:"none"});
    const result = await signIn("credentials",{
      ...userInfo.current,
      redirect:true,
      callbackUrl:"/"
    })
    console.log(result);
    if (result.error) {
      setError({});
    } else {
      setError({display:"none"});
      router.push("/");
    }
  }
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  })
  return (
    <main className="flex justify-center items-center h-full bg-gray-50" >
      <form onSubmit={(e)=>handleSubmit(e)} className=" p-3  w-[400px] mb-60 ">
        <h1 className="text-center text-6xl mb-10" >Log In</h1>
        <p style={error} className="w-full p-2 pl-4 text-lg bg-red-500 rounded-md text-white">Error : please enter a correct Password/Email</p>
        
        <label className=" text-slate-500">
          <input
            className="block border-2 placeholder:text-black pl-4 my-3 w-full bg-gray-50 p-2 rounded-md h-14 text-lg"
            type="email"
            placeholder="Email"
            onChange={(e) => userInfo.current.email=e.target.value}
            required
          />
        </label>
        <label className=" text-slate-500">
          <input
            className="block border-2 placeholder:text-black pl-4 my-3 w-full bg-gray-50 p-2 rounded-md h-14 text-lg"
            type="password"
            placeholder="Password"
            onChange={(e) => userInfo.current.password=e.target.value}
            required
          />
        </label>
        <input type="submit"  className="block border bg-black h-14 text-xl rounded-lg w-full text-center text-white active:bg-gray-50 active:text-black active:border-black"  />
        <div className="flex mt-2 ">
          <div className="w-1/2 h-1 border-2 self-center"></div>
          <p className="mx-3">Or</p>
          <div className="w-1/2 h-1 border-2 self-center"></div>
        
        </div>
        <button onClick={() => signIn("google")} className="mt-2 flex justify-center items-center block border bg-black h-14 rounded-lg w-full text-white text-lg font-extrabold">
        <Image src={googleLogo} className="inline-block h-1/2"/>
          
          Sign in with Google
        </button>
        <Link href={"/signup"} className="text-center w-full block my-4 text-gray-500">Create an account</Link>
        
      </form>
    </main>
  );
}
