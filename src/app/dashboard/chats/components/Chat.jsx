"use client";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import Message from "./Message";
import message from "../lib/message";
import { pusherClient } from "@/lib/pusher";

export default function Chat({ chatId }) {
  const input = useRef("");
  const divRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const submitHandler = async (e) => {
    if (input.current) {
      const newMsg = await message( chatId, input.current,);
      console.log(newMsg);
    }
  };
  console.log(messages);
  useEffect(() => {
    if (chatId) {
      console.log("chatId")
    pusherClient.subscribe(chatId);
    divRef?.current?.scrollIntoView();
    const messageHandler = (msg) => {setMessages((prev) => [...prev, msg])};
    pusherClient.bind("messages:new", messageHandler);
    return () => {
      pusherClient.unsubscribe(chatId);
      pusherClient.unbind("messages:new", messageHandler);
    };
  }
  }, [chatId,messages]);
  return (
    <div className="flex flex-col w-full h-full">
      <div
        className="p-4   flex flex-col w-full h-full overflow-scroll overflow-x-hidden"
        id="chat"
      >
        <div className="h-full"></div>
        <Message message={"ads"} isUser={true} />
      </div>
      <div className="w-full h-20 mt-auto flex items-center p-3">
        <input
          onChange={(e) => {
            input.current = e.target.value;
          }}
          className="w-full h-1/2 p-6 bg-gray-100 rounded-full"
          placeholder="Type a message..."
        />
        <AiOutlineSend
          onClick={(e) => {
            submitHandler(e);
          }}
          className="w-8 h-8 ml-2 hover:fill-blue-300 hover:cursor-pointer "
        />
      </div>
      <div ref={divRef}></div>
    </div>
  );
}
