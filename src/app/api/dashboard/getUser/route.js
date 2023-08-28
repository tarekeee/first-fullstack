import prisma from "@/lib/prisma";

export async function GET(req) {
    const id = req.headers.get("id");
    try {
    const user = await prisma.User.findFirst({ 
        where : { id : id },
    })
    if (user) {
        return new Response(JSON.stringify(user),{status : 200})
    } else {
        return new Response(JSON.stringify("User not found"),{status : 400})
    }}
     catch (e) {
        return new Response(JSON.stringify("Somthing went wrong"),{status : 404})
    }
}
