import React, { useState, useRef, useEffect } from "react";

export function ChatInput({ onSend }: { onSend: (msg: string) => void }) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      onSend(input.trim());
      setInput("");
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      className="chat-input"
      type="text"
      value={input}
      placeholder="Type your message…"
      onChange={e => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
    />
  );
}
