import type { MessageWrapper } from "../entities/models";

export default function Message({ message } : { message: MessageWrapper }) {
  if(message.sent) {
    return (
      <p className="message message-sent">{message.text}</p>
    )
  }
  
  return (
    <p className="message message-recieved">{message.text}</p>
  );
}