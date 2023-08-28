"use client";
import React from "react";
import ConvosList from "./components/ConvosList";
import NewChat from "./components/NewChat";
import Chat from "./components/Chat";
import Pusher from "pusher-js";
import { useState } from "react";

export default function Chats() {
  const [active, setActive] = useState(false);
  const [activeChat, setActiveChat] = useState(null);

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col items-center">
        <ConvosList
          setActive={setActive}
          setActiveChat={setActiveChat}
          activeChat={activeChat}
        />
        <NewChat active={active} setActive={setActive} />
      </div>
      <Chat chatId={activeChat} />
    </div>
  );
}
