import React, { useState } from "react";
import axios from "axios";

export default function ChatUI() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "ai", text: "Hello 👋 I am your AI health assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [threadId, setThreadId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const formatAssistantContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, i) => {
      const parts = line.split(/(https?:\/\/[^\s]+)/g);
      return (
        <p key={i} style={{ margin: "4px 0" }}>
          {parts.map((part, j) =>
            part.match(/https?:\/\/[^\s]+/) ? (
              <a key={j} href={part} target="_blank" rel="noopener noreferrer" style={{ color: "#1a73e8" }}>
                {part}
              </a>
            ) : (
              part
            )
          )}
        </p>
      );
    });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/openai/send", {
        query: userMessage,
        ...(threadId && { threadId }),
      });

      const newThreadId = response.data.threadId;
      if (newThreadId) setThreadId(newThreadId);

      if (newThreadId) {
        const messagesRes = await axios.get(`http://localhost:3000/messages/thread/${newThreadId}`);
        const formattedMessages = messagesRes.data.map((msg: any) => ({
          sender: msg.role === "user" ? "user" : "ai",
          text: msg.content,
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [...prev, { sender: "ai", text: "❌ Failed to send message." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.sender}`}>
            <div className="bubble">{msg.sender === "ai" ? formatAssistantContent(msg.text) : msg.text}</div>
          </div>
        ))}
        {loading && (
          <div className="chat-message ai">
            <div className="bubble">🤖 AI is typing...</div>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
