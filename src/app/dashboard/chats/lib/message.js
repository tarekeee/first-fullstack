export default async function message(chatId, msg) {
  console.log(chatId)
  console.log(msg)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/dashboard/message`,
    {method : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        chatId:chatId,
        msg:msg,
    })}
  );
  return await res.json();
}
