"use client";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";  // ✅ Import Send Icon

export default function Chatbot({ closeChat }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Ask me anything about my resume." }
  ]);
  const [userInput, setUserInput] = useState("");

  // Fetch AI response from Together AI
  const fetchChatResponse = async (message) => {
    const response = await fetch("https://api.together.xyz/inference", {
      method: "POST",
      headers: {
        "Authorization": `Bearer YOUR_API_KEY`, 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral-7b",
        prompt: `Answer based on this resume: ${message}`,
        max_tokens: 150
      })
    });

    const data = await response.json();
    return data.text;
  };

  // Handle message submission
  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    setMessages([...messages, userMessage]);
    setUserInput("");

    // Get AI response
    const aiResponse = await fetchChatResponse(userInput);
    setMessages((prev) => [...prev, { sender: "bot", text: aiResponse }]);
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <span>Chat with Me</span>
        <button onClick={closeChat}>✖</button>
      </div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()} // ✅ Send on Enter
        />
        <button onClick={sendMessage} className="send-button">
          <FaPaperPlane size={18} />  {/* ✅ Send icon instead of text */}
        </button>
      </div>
    </div>
  );
}
