"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import getConvos from "../lib/getConvos.js";
import { useEffect, useMemo, useState } from "react";
import ConvoItem from "./ConvoItem.jsx";
import Header from "./Header.jsx";
import Pusher from "pusher-js";
export default function ConvosList({ setActive, setActiveChat, activeChat }) {
  const { data: session } = useSession();
  const [convos, setConvos] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useMemo(() => {
    async function Con() {
      setLoading(true);
      if (session) {
        setConvos(await getConvos(session?.user?.name));
      }
      setLoading(false);
    }
    Con();
  } ,[session])
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
    console.log(convos);
  }, [session]);
  if (loading) {
    return <div className="h-full w-48 border-r-2 ml-32">Loading</div>;
  }
  return (
    <div
      className="h-full w-80 border-r-2 overflow-scroll overflow-x-hidden"
      id="ConvosList"
    >
      <Header setActive={setActive} />
      {typeof convos !== "undefined" && convos
        ? convos?.map((item, index) => (
            <ConvoItem
              selected={activeChat === item.id}
              key={item.id}
              id={item.id}
              setActiveChat={setActiveChat}
              name={item.isGroup ? item.name : item.users[0].name}
              image={item.isGroup ? item.iamge : item.users[0].image}
            />
          ))
        : null}
    </div>
  );
}
