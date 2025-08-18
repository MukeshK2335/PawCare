import React, { useState } from 'react';
import '../Style/jujuAi.css';
import jujuDogAi from '../assets/Juju.png';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Get your API key from https://makersuite.google.com/app/apikey
const API_KEY = "AIzaSyBqapR-g_ly1lLUk5OzyOLlHZK6yxOr0rk";
const genAI = new GoogleGenerativeAI(API_KEY);

const JujuAI = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    
    // Add welcome message when component mounts
    React.useEffect(() => {
        if (messages.length === 0) {
            setMessages([{
                sender: "juju",
                text: "Hi there! I'm JuJu, your animal expert assistant. I can help with questions about pets, wildlife, animal care, behavior, and other animal-related topics. What would you like to know about animals today?"
            }]);
        }
    }, [open]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages(prev => [...prev, userMessage]);

        try {
            const safetySettings = [
                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            ];
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings });
            const result = await model.generateContent(input);
            const response = await result.response;
            const text = await response.text();
            const aiMessage = { sender: "juju", text: text };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error(error);
            const errorMsg = { sender: "juju", text: "Oops! Juju AI is not available right now." };
            setMessages(prev => [...prev, errorMsg]);
        }

        setInput("");
    };

    return (
        <div className="juju-ai-container">
            {open && (
                <div className="juju-chatbox">
                    <div className="juju-header">
                        <span>🐶 JuJu Animal Expert</span>
                        <button className="juju-close-button" onClick={() => setOpen(false)}>×</button>
                    </div>
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
                            placeholder="Ask JuJu about animals..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}

            {!open && (
                <div className="juju-button-with-caption" onClick={() => setOpen(!open)}>
                    <span className="juju-caption">JuJu Pet Expert</span>
                    <button className="juju-float-button">
                        <img src={jujuDogAi} alt="Juju AI" className="juju-float-icon" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default JujuAI;
