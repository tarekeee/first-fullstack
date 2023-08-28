export default function Message({message,isUser}) {
  return (
    <div className={`chat-bubble  ${isUser ? "user" : "other"}  `}>{message}</div>
  );
}
