"use client";
import React, { useRef, useState } from "react";
import createConvo from "../lib/createConvo";
import { useSession } from "next-auth/react";
import { Oval } from "react-loader-spinner";
import User from "./User";
export default function NewChat({ active, setActive }) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [err,setErr] = useState(false);
  const input = useRef("");
  const divRef = useRef(null);
  const [user, setUser] = useState({
    active: false,
    id: session?.user?.id,
    name: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image,
  });
  const cleanUp = () => {
    setActive(false);
    setUser({
      active: false,
      id: "",
      name: "",
      email: "",
      image:"",
    });
    setIsLoading(false);
    setErr(false);
  }
  const getUser = async (e) => {
    input.current = e.target.value;
    setUser({
      active: false,
      id: "",
      name: "",
      email: "",
      image:"",
    });
    setErr(false);
    setIsLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/dashboard/getUser`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", id: e.target.value },
      }
    );
    setIsLoading(false);
    if (res.ok) {
      const data = await res.json();
      setUser({
        active: true,
        id: data.id,
        name: data.name,
        email: data.email,
        image: data.image,
      });
    } else {
      setErr(true);
    }
  };
  const addConvo = async (e) => {
    console.log("selfId");
    console.log(session.user.id);
    const res = await createConvo(input.current, session?.user?.id);
    if ( res ) {
      cleanUp();
    } else {
      alert("Somthing Went Wrong");
      cleanUp();
    }
  };
  if (active) {
    return (
      <div
        className=" -z-1 w-full h-full absolute top-0 left-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
        }}
        onClick={(e) => {if (e.target === divRef.current) {
          cleanUp();
        }}}
        ref={divRef}
      >
        <div className=" z-50 rounded-lg flex flex-col items-center p-3 w-96 h-96 border-2 absolute top-56 left-1/2 bg-white  -translate-x-1/2">
          <span className="text-3xl block">New Chat</span>
          <label className="my-5 mb-20 text-2xl">
            <center>
              <input
                onChange={(e) => getUser(e)}
                placeholder="Enter a user ID"
                type="text"
                className="p-2 placeholder:text-lg border-black border-2 rounded-lg  w-5/6 h-10"
              />
            </center>
          </label>

          {isLoading ? (
            <Oval
              height={80}
              width={80}
              color="black"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="white"
              strokeWidth={2}
              strokeWidthSecondary={2}
              className=""
            />
          ) : null}

          <User
            active={user.active}
            id={user.id}
            email={user.email}
            name={user.name}
            image={user.image}
          />
          {user.active ? (
            <div class="inline-flex mt-4">
              <button onClick={(e) =>addConvo(e)} class="text-xl bg-gray-300 hover:bg-green-500 text-gray-800 font-bold py-2 px-4 rounded-l">
                Add
              </button>
              <button
                onClick={() => cleanUp()}
                class="text-xl bg-gray-300 hover:bg-red-500 text-gray-800 font-bold py-2 px-4 rounded-r"
              >
                Cancel
              </button>
            </div>
          ) : null}
          {err ? (
            <span className="text-center text-xl -mt-10">
              User doesn't exist or something went wrong, <br /> please try
              again
            </span>
          ) : null}
        </div>
      </div>
    );
  } else return null;
}
