import prisma from "@/lib/prisma";
import { pusher } from "@/lib/pusher";

export async function POST(req) {
  try {
    const user = await req.json();
    const Convos = await prisma.Conversation.findMany({
      where: {
        users: {
          some: {
            name: user,
          },
        },
      },
      include: {
        users: {
          where: {
            NOT: { name: user },
          },
        },
      },
    });
    return new Response(JSON.stringify(Convos));
  } catch (e) {
    return new Response(JSON.stringify("error"), {
      status: 404,
    });
  }
}
