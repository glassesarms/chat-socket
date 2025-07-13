import { useCallback, useEffect, useRef, useState } from "react";
import { useWebSocket } from "./hooks/useWebsocket";
import Message from "./components/Message";
import type { MessageSend, MessageWrapper } from "./entities/models";
import { ChatInput } from "./components/ChatInput";

export default function App() {
  const [messages, setMessages] = useState<MessageWrapper[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [messages])

  const handleMessage = useCallback(
    (data: string) => setMessages(prev => [...prev, {text: data, sent: false}]),
    []
  );

  const { sendMessage } = useWebSocket<MessageSend, string>(
    "wss://8zhy2d8jh1.execute-api.ap-southeast-2.amazonaws.com/production/",
    handleMessage
  )

  const handleSend = (input: string) => {
    if(input !== "") {
      sendMessage({
        action: 'sendMessage',
        message: input
      });
      setMessages(prev => [...prev, {text: input, sent: true}])
    }
  }

  return (
    <div className="app">
      <div className="messages"  >
        {messages.map((message, idx) => (
            <Message key={idx} message={message}></Message>
          ))}
        <div ref={messagesEndRef} />
      </div>
    <ChatInput onSend={handleSend}/>
    </div>
  )

}