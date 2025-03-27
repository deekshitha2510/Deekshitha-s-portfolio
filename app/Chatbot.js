import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input) return;

        const newMessages = [...messages, { sender: "user", text: input }];
        setMessages(newMessages);

        try {
            const response = await axios.post("http://localhost:5000/chat", { message: input });
            setMessages([...newMessages, { sender: "bot", text: response.data.reply }]);
        } catch (error) {
            console.error("Chatbot error:", error);
        }

        setInput("");
    };

    return (
        <div style={{
            position: "fixed", top: "20px", right: "20px",
            width: "300px", height: "400px", background: "#001F3F", color: "#fff",
            padding: "10px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
            display: "flex", flexDirection: "column"
        }}>
            {/* Messages */}
            <div style={{ flexGrow: 1, overflowY: "auto", paddingBottom: "10px" }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left", margin: "5px 0" }}>
                        <p style={{
                            background: msg.sender === "user" ? "#ff5a91" : "#444",
                            display: "inline-block", padding: "8px 12px", borderRadius: "10px",
                            color: "#fff", maxWidth: "80%"
                        }}>
                            {msg.text}
                        </p>
                    </div>
                ))}
            </div>

            {/* Input & Send Button */}
            <div style={{ display: "flex", alignItems: "center" }}>
                <input 
                    type="text" value={input} onChange={(e) => setInput(e.target.value)}
                    style={{
                        flexGrow: 1, padding: "8px", borderRadius: "5px", border: "none",
                        outline: "none", background: "#fff", color: "#000"
                    }} 
                    placeholder="Ask me anything..." 
                />
                <button 
                    onClick={sendMessage} 
                    style={{
                        marginLeft: "5px", padding: "8px", borderRadius: "5px", border: "none",
                        background: "#ff5a91", color: "#fff", cursor: "pointer"
                    }}
                >
                    ➤
                </button>
            </div>
        </div>
    );
};

export default Chatbot;

