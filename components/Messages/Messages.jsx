import React, { useState, useEffect } from "react";
import { GET } from "../../utils/http";

import "./index.css";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [chatName, setChatName] = useState("");
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        GET("https://api.npoint.io/45615d0ddef177eef95b").then((res) =>
            setMessages(res.messageList)
        );
    }, []);

    const onSetChatName = (value) => setChatName(value);

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            const updatedMessages = [...messages];
            updatedMessages[0].messages.push({
                sender: "John",
                content: newMessage,
            });
            setMessages(updatedMessages);
            setNewMessage("");
        }
    };

    const onChatRendering = () => {
        switch (chatName) {
            case "":
                return messages?.map((chat, i) => (
                    <div
                        className="Messages__chat"
                        onClick={() => onSetChatName(chat.participants[1].username)}
                        key={i}
                    >
                        <img
                            src={chat.participants[1].avatar_url}
                            alt={chat.participants[1].username}
                        />
                        <div className="Messages__chat--text">
                            <p>{chat.participants[1].username}</p>
                            <p>{chat.messages[chat.messages.length - 1].content}</p>
                        </div>
                    </div>
                ));
            case "Emily":
                return (
                    <div className="singleChat">
                        <p onClick={() => onSetChatName("")} className="back-arrow">
                            &larr; Indietro
                        </p>
                        {messages[0].messages.map((message, i) => (
                            <p
                                className="singleChat__msg"
                                style={{
                                    alignSelf: message.sender === "John" ? "flex-end" : "flex-start",
                                }}
                                key={i}
                            >
                                {message.content}
                            </p>
                        ))}
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Scrivi un messaggio"
                        />
                        <button onClick={handleSendMessage}>Invia</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return <div className="Messages">{onChatRendering()}</div>;
};

export default Messages;

