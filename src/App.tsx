import { useCallback, useEffect, useRef, useState } from "react";
import { useWebSocket } from "./hooks/useWebsocket";

type MessageSend = { action: "sendMessage", message: string };

type MessageWrapper = {text: string, sent: boolean};

function Message({ message } : { message: MessageWrapper }) {
  if(message.sent) {
    return (
      <p>{message.text}</p>
    )
  }
  
  return (
    <p>recieved: {message.text}</p>
  );
}

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<MessageWrapper[]>([]);

  const handleMessage = useCallback(
    (data: string) => setMessages(prev => [...prev, {text: data, sent: false}]),
    []
  );

  const { sendMessage } = useWebSocket<MessageSend, string>(
    "wss://8zhy2d8jh1.execute-api.ap-southeast-2.amazonaws.com/production/",
    handleMessage
  )

  const handleSend = () => {
    sendMessage({
      action: 'sendMessage',
      message: input
    });
    setInput("");
    setMessages(prev => [...prev, {text: input, sent: true}])
  }

  return (
    <div>
        {messages.map((message, idx) => (
          <Message key={idx} message={message}></Message>
        ))}
      <input value={input} onChange={e => setInput(e.target.value)}/>
      <button onClick={handleSend}>Send</button>
    </div>
  )

}