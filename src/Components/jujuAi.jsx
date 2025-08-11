import React, { useState } from 'react';
import '../Style/jujuAi.css';
import jujuDogAi from '../assets/Juju.png';

const JujuAI = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages(prev => [...prev, userMessage]);

        try {
            const response = await fetch("http://127.0.0.1:5000/chatbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // Maintain Flask session
                body: JSON.stringify({ user_message: input })
            });

            const data = await response.json();
            const aiMessage = { sender: "juju", text: data.bot_response };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMsg = { sender: "juju", text: "Oops! Juju AI is not available right now." };
            setMessages(prev => [...prev, errorMsg]);
        }

        setInput("");
    };

    return (
        <div className="juju-ai-container">
            {open && (
                <div className="juju-chatbox">
                    <div className="juju-header">🐶 JuJu AI Chat</div>
                    <div className="juju-messages">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`msg ${msg.sender}`}
                                dangerouslySetInnerHTML={{ __html: msg.text }}
                            />
                        ))}
                    </div>
                    <div className="juju-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Ask JuJu something..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}

            <div className="juju-button-with-caption" onClick={() => setOpen(!open)}>
                <span className="juju-caption">JuJu AI</span>
                <button className="juju-float-button">
                    <img src={jujuDogAi} alt="Juju AI" className="juju-float-icon" />
                </button>
            </div>
        </div>
    );
};

export default JujuAI;
