
export default async function getSession() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/session`, {
        method:"GET",
        headers:{"Content-Type" : "application/json"}
    }); 
    const session = await res.json();
    return session;
}