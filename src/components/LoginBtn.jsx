"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoginBtn() {
    return (
      <div className="ml-auto flex ">
        <Link
          className=" px-3 p-1 text-xl hover:bg-white hover:text-orange-900"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,0,0,1) 45%, rgba(254,255,0,1) 78%)",
            WebkitTextFillColor: "transparent",
            WebkitBackgroundClip: "text",
          }}
          href={"/login"}
        >
          Sing In
        </Link>
        <Link
          className="  px-3 p-1 text-xl hover:bg-white hover:text-orange-900"
          href={"/signup"}
          style={{
            background:
              "linear-gradient(90deg, rgba(254,255,0,1) 29%, rgba(255,0,0,1) 78%)",
            WebkitTextFillColor: "transparent",
            WebkitBackgroundClip: "text",
          }}
        >
          Sing Up
        </Link>
      </div>
    );
}
