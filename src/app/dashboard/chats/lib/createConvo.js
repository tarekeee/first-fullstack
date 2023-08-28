import { getServerSession } from "next-auth";
import { headers } from "next/dist/client/components/headers";

export default async function createConvo(id,selfId) {
    try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/dashboard/createConvo`, {
        method:"POST",
        body : JSON.stringify({id:id,selfId:selfId,isGroup:false}),
        headers: {"Content-Type": "application/json"}
    });
    return res.ok;
    } catch (e) {
        console.log(e);
        return null
    }
}