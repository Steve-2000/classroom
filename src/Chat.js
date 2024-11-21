import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import "./chat.css";

const socket = io("http://localhost:3001");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const username = "Student123"; // Replace with dynamic username

  useEffect(() => {
    // Fetch chat history on load
    axios.get("http://localhost:3001/chats").then((response) => {
      setMessages(response.data);
    });

    // Listen for new messages
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const messageData = {
      username,
      message: newMessage,
    };

    socket.emit("newMessage", messageData);
    setNewMessage("");
  };

  return (
    <div className="chat">
      <div className="chat-container">
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className="chat-message">
              <strong>{msg.username}:</strong> {msg.message}
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat ;
