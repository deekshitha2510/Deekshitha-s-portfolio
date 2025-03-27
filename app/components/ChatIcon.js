"use client";
import { useState } from "react";
import { FaMessage } from "react-icons/fa6";
import Chatbot from "./Chatbot";

export default function ChatIcon() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Icon */}
      <div className="chat-icon" onClick={() => setIsOpen(!isOpen)}>
        <FaMessage size={28} />
      </div>

      {/* Chatbot Window */}
      {isOpen && <Chatbot closeChat={() => setIsOpen(false)} />}
    </>
  );
}
