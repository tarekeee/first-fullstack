import prisma from "@/lib/prisma";

export async function POST(req) {
  const { id, selfId, isGroup } = await req.json();
  console.log(id,selfId);
  if (!isGroup) {
    
    const check = await prisma.Conversation.findFirst({
      where: {
        AND: [
          {
            users: {
              some: {
                id: id,
              },
            },
          },
        {
            users : {
                some : {
                    id : selfId,
                }
            }
        }],
      },
      include : {users : true}
    });
    console.log(check);
    if (check) {
      return new Response(
        JSON.stringify({
          error: "Conversation already exists",
        }),
        { status: 400 }
      );
    } else {
      try {
        const conversation = await prisma.Conversation.create({
          data: {
            users: { connect: [{ id: id }, { id: selfId }] },
          },
        });
        return new Response(JSON.stringify(conversation), { status: 200 });
      }
       catch (e) {
        return new Response(
          JSON.stringify({
            error: "Something went wrong",
          }),
          { status: 400 }
        );
      }
    }
  }
}
