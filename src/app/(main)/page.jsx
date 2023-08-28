"use client";
import { useSession } from "next-auth/react";
import logo from "@/../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session]);
  return (
    <main className="flex flex-col items-center min-h-screen py-16">
      <Image src={logo} alt="logo" height={150} width={150} />
      <h1 className="text-4xl font-bold mt-8 text-center">
        The chat app app you never thought
        <br /> you needed
      </h1>
      <p
        className="mt-4 text-center"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,255,0,0.7270588235294118) 50%, rgba(255,0,0,1) 100%)",
          WebkitTextFillColor: "transparent",
          WebkitBackgroundClip: "text",
        }}
      >
        Because you probably didn't
      </p>
      <Link
        href={"/login"}
        style={{
          background:
            "linear-gradient(90deg, rgba(254,255,0,1) 29%, rgba(255,0,0,1) 78%)",
          WebkitTextFillColor: "transparent",
          WebkitBackgroundClip: "text",
        }}
        className="my-4 py-2 px-16 rounded-xl w-fit text-center text-4xl mt-28"
      >
        Sign In
      </Link>
      <div className="flex items-center justify-center">
        <div className="h-2 w-52  bg-gray-100"></div>
        <p className=" mx-4 text-3xl">Or</p>
        <div className=" h-2 w-52 bg-gray-100"></div>
      </div>
      <Link
        href={"/signup"}
        className="my-4 py-2 px-16 rounded-xl w-fit text-center text-4xl "
        style={{
          background:
            "linear-gradient(90deg, rgba(254,255,0,1) 29%, rgba(255,0,0,1) 78%)",
          WebkitTextFillColor: "transparent",
          WebkitBackgroundClip: "text",
        }}
      >
        Sign Up
      </Link>
    </main>
  );
}
