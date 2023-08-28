
export default async function getConvos(user) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/dashboard/convos`, {
      body : JSON.stringify(user),
      method : "POST",
      headers : { "Content-Type" : "application/json"}
    });
    const Convos = await res.json();
    console.log(Convos);
    return Convos;
  } catch (e) {
    console.log(e);
    return "err";
  }
}
