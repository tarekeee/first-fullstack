import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const user = await JSON.parse(req.headers.get("user"));
    const id = await prisma.User.findFirst({
      where: {
        email: user.email,
      },
      select: { id: true },
    });
    console.log(id);
    return new Response(JSON.stringify(id))
  } catch (e) {
    console.log(e);
    return null;
  }
}
