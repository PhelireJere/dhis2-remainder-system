import React, { useState } from 'react';
import './message.css';

const message = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            setMessages([...messages, { text: message, sender: 'user' }]);
            setMessage('');
        }
    };

    const handleReceiveMessage = (text) => {
        setMessages([...messages, { text, sender: 'bot' }]);
    };

    return (
        <div className="messaging-container">
            <div className="header">
                <img src="dhis2-logo.png" alt="DHIS2 Logo" className="logo" />
                <h1>Messaging Feature</h1>
            </div>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <form className="message-form" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    required
                />
                <button type="submit" className="send-button">Send</button>
                <button type="button" className="cancel-button" onClick={() => setMessage('')}>Cancel</button>
            </form>
        </div>
    );
};

export default message;
