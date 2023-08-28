import prisma from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const currentUser = await getServerSession();
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getId`, {
      headers: {
        "Content-Type": "application/json",
        user: JSON.stringify(currentUser.user),
      },
      method: "GET",
    });
    const id = await res.json();
    currentUser.user.id = id.id;
    const { chatId, msg } = await req.json();
    console.log(chatId);
    if (msg.length === 0) {
      return new Response(
        JSON.stringify({ error: "Message cannot be empty" }),
        {
          status: 400,
        }
      );
    }
    const newMessage = await prisma.Messages.create({
      include: {
        author: true,
      },
      data: {
        body: msg,
        conversation: {
          connect: { id: chatId },
        },
        author: {
          connect: { id: currentUser.user.id },
        },
        seen: false,
      },
    });
    const updatedConversation = await prisma.Conversation.update({
      where: {
        id: chatId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });
    await pusherServer.trigger(chatId, "messages:new", newMessage);

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1];
    return NextResponse.json(lastMessage);
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error));
  }
}
