import React, { useState, useEffect } from 'react';
import './message.css';

const message = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(''); // For message status
    const [feedback, setFeedback] = useState(''); // For feedback

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            const newMessage = {
                id: messages.length + 1,
                content: message,
                sender: 'user',
                timestamp: new Date().toLocaleString(),
                status: 'Delivered'
            };
            setMessages([...messages, newMessage]);
            setMessage('');
            setStatus('Delivered');
        }
    };

    const handleDeleteMessage = (id) => {
        setMessages(messages.filter((msg) => msg.id !== id));
    };

    const handleReceiveMessage = (text) => {
        const newMessage = {
            id: messages.length + 1,
            content: text,
            sender: 'bot',
            timestamp: new Date().toLocaleString(),
            status: 'Delivered'
        };
        setMessages([...messages, newMessage]);
        setStatus('Delivered');
    };

    const handleFeedback = (e) => {
        e.preventDefault();
        if (feedback.trim()) {
            const newFeedback = {
                id: messages.length + 1,
                content: feedback,
                user: 'user',
                timestamp: new Date().toLocaleString()
            };
            setMessages([...messages, newFeedback]);
            setFeedback('');
        }
    };

    return (
        <div className="messaging-container">
            <div className="header">
                <img src="dhis2-logo.png" alt="DHIS2 Logo" className="logo" />
                <h1>DHIS2 Messaging Feature</h1>
            </div>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.content}
                        <div className="timestamp">{msg.timestamp}</div>
                        <div className="status">{msg.status}</div>
                        <button className="delete-button" onClick={() => handleDeleteMessage(msg.id)}>Delete</button>
                    </div>
                ))}
            </div>
            <form className="message-form" onSubmit={handleSendMessage}>
                <label htmlFor="message">Message:</label>
                <input
                    type="text"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    required
                />
                <button type="submit" className="send-button">Send</button>
                <button type="button" className="cancel-button" onClick={() => setMessage('')}>Cancel</button>
            </form>
            <form className="feedback-form" onSubmit={handleFeedback}>
                <label htmlFor="feedback">Feedback:</label>
                <input
                    type="text"
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Provide your feedback..."
                    required
                />
                <button type="submit" className="feedback-button">Submit Feedback</button>
            </form>
        </div>
    );
};

export default message;
