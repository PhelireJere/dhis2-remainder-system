import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './messaging.css';
import { CircularLoader } from '@dhis2/ui';

const message = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/messages');
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    if (loading) {
        return (
            <div className="loader">
                <CircularLoader /> <p>Loading messages. Please wait...</p>
            </div>
        );
    }

    return (
        <div className="messaging-container">
            <h2>Sent Messages</h2>
            {messages.length === 0 ? (
                <p>No messages found.</p>
            ) : (
                messages.map((message, index) => (
                    <div className="message" key={index}>
                        <div className="message-date">{new Date(message.date).toLocaleString()}</div>
                        <div className="message-text">{message.message}</div>
                    </div>
                ))
            )}
        </div>
    );
};

export default message;
