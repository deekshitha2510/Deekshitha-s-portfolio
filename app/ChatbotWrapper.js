"use client";
import { useState, useEffect, useCallback } from "react";
import { FaMessage } from "react-icons/fa6";
import { FaPaperPlane } from "react-icons/fa"; // ✅ Import Send Icon

export default function ChatbotWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isHovered, setIsHovered] = useState(false); // ✅ State for hover effect

  // ✅ Function to handle sending messages
  const sendMessage = useCallback(async () => {
    if (!input.trim()) return; // Prevent empty messages

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput(""); // Clear input after sending

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: input }),
      });

      console.log("📡 Response status:", response.status); // Log HTTP status

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("📥 Response Data:", data); // Log server response

      // ✅ Add bot's response to messages
      const botMessage = { sender: "bot", text: data.reply || "No response" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);

    } catch (error) {
      console.error("❌ Fetch error:", error);
    }
  }, [input]);

  return (
    <div>
      {/* Chat Icon */}
      <div className="chat-icon" onClick={() => setIsOpen(!isOpen)} style={iconStyle}>
        <FaMessage size={24} />
      </div>

      {/* Chat Box */}
      {isOpen && (
        <div style={chatBoxStyle}>
          <div style={messagesStyle}>
            {messages.map((msg, i) => (
              <div key={i} style={msg.sender === "user" ? userStyle : botStyle}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div style={chatInputContainer}>
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              style={inputStyle}
            />
            <button
              onClick={sendMessage}
              style={{
                ...sendButtonStyle,
                color: isHovered ? "#E91E63" : "#1A237E", // ✅ Dynamic hover effect
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <FaPaperPlane size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// 🔹 **Custom Styles**
const iconStyle = {
  position: "fixed",
  top: "20px",
  right: "20px",
  background: "linear-gradient(135deg, #1A237E, #E91E63)", // ✅ Dark Blue to Pink Gradient
  color: "#fff",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  fontSize: "24px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
};

const chatBoxStyle = {
  position: "fixed",
  top: "80px",
  right: "20px",
  width: "300px",
  height: "400px",
  background: "#fff",
  color: "#333",
  borderRadius: "10px",
  padding: "10px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
  display: "flex",
  flexDirection: "column",
  border: "1px solid #ddd",
};

const messagesStyle = {
  flexGrow: 1,
  overflowY: "auto",
  padding: "10px",
};

const userStyle = {
  textAlign: "right",
  background: "#1A237E",
  color: "#fff",
  padding: "8px",
  borderRadius: "5px",
  margin: "5px 0",
  alignSelf: "flex-end",
};

const botStyle = {
  textAlign: "left",
  background: "#E91E63",
  color: "#fff",
  padding: "8px",
  borderRadius: "5px",
  margin: "5px 0",
  alignSelf: "flex-start",
};

const chatInputContainer = {
  display: "flex",
  alignItems: "center",
  padding: "10px",
  borderTop: "1px solid #ddd",
};

const inputStyle = {
  flex: 1,
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  outline: "none",
};

const sendButtonStyle = {
  background: "none",
  border: "none",
  marginLeft: "8px",
  cursor: "pointer",
  transition: "0.2s",
  display: "flex",
  alignItems: "center",
};
