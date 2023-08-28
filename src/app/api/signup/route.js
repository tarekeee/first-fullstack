import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
export async function POST(req) {
  const data = await req.json();
  const check = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: data.email,
        },
        {
          name: data.username,
        },
      ],
    },
  });
  if (check) {
    console.log("hello")
    return new Response(JSON.stringify({ error: "User already exists" }), {
      status: 400,
    });
  } else {
    
    let user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.username,
        password: await bcrypt.hash(data.password,10),
      },
    });
    if (data.image) {
      user = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          image: data.image,
        },
      });
    }
    if (user) {
      const { password, ...rest } = user;
      console.log("user created");
      return new Response(JSON.stringify(rest), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ error: "Something went wrong" }), {
        status: 404,
      });
    }
  }
}
