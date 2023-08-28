import { signJWTtoken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

export async function POST(req) {
    const body = await req.json();
    console.log(body);
    const user = await prisma.user.findFirst({
        where : {
            email : body.email
        }
    })
    if (user && await bcrypt.compare(body.password,user.password) ) {
        const {password, ...res} = user; 
        console.log("user found");
        return new Response(JSON.stringify(res));
    } else {
        return new Response(JSON.stringify(null));
    }
}