import React, { useState, useEffect } from 'react';
import './scheduling.css';

const Schedulling = () => {
    const [formData, setFormData] = useState({
        patientName: '',
        contactNumber: '',
        appointmentDate: '',
        appointmentTime: '',
        reminderType: 'Email',
        messageTemplate: '',
        venue: '',
        duration: ''
    });

    const [reminders, setReminders] = useState([]);
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        // Fetch registered patients from the registration list (mock data for now)
        const fetchPatients = async () => {
            const response = await fetch('/api/patients'); // Replace with actual API endpoint
            const data = await response.json();
            setPatients(data);
        };

        fetchPatients();
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setReminders([...reminders, formData]);
        setFormData({
            patientName: '',
            contactNumber: '',
            appointmentDate: '',
            appointmentTime: '',
            reminderType: 'Email',
            messageTemplate: '',
            venue: '',
            duration: ''
        });
    };

    const handleCancel = () => {
        setFormData({
            patientName: '',
            contactNumber: '',
            appointmentDate: '',
            appointmentTime: '',
            reminderType: 'Email',
            messageTemplate: '',
            venue: '',
            duration: ''
        });
    };

    return (
        <div className="container">
            <div className="header">
                <img src="dhis2-logo.png" alt="DHIS2 Logo" className="logo" />
                <h1>DHIS2 Reminder Scheduling</h1>
            </div>
            <form id="reminderForm" onSubmit={handleSubmit}>
                <label htmlFor="patientName">Patient Name:</label>
                <select id="patientName" value={formData.patientName} onChange={handleChange} required>
                    <option value="">Select Patient</option>
                    {patients.map((patient) => (
                        <option key={patient.id} value={patient.name}>
                            {patient.name}
                        </option>
                    ))}
                </select>
                
                <label htmlFor="contactNumber">Contact Number:</label>
                <input type="tel" id="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
                
                <label htmlFor="appointmentDate">Appointment Date:</label>
                <input type="date" id="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required />
                
                <label htmlFor="appointmentTime">Appointment Time:</label>
                <input type="time" id="appointmentTime" value={formData.appointmentTime} onChange={handleChange} required />
                
                <label htmlFor="reminderType">Reminder Type:</label>
                <select id="reminderType" value={formData.reminderType} onChange={handleChange} required>
                    <option value="Email">Email</option>
                    <option value="SMS">SMS</option>
                    <option value="Phone Call">Phone Call</option>
                </select>
                
                <label htmlFor="venue">Venue:</label>
                <input type="text" id="venue" value={formData.venue} onChange={handleChange} required />
                
                <label htmlFor="duration">Duration:</label>
                <input type="text" id="duration" value={formData.duration} onChange={handleChange} required />
                
                <label htmlFor="messageTemplate">Message Template:</label>
                <textarea id="messageTemplate" value={formData.messageTemplate} onChange={handleChange} required />
                
                <button type="submit" className="add-reminder">Add Reminder</button>
                <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>
            </form>
            <h2>Scheduled Reminders</h2>
            <ul id="reminderList">
                {reminders.map((reminder, index) => (
                    <li key={index}>
                        {reminder.patientName} - {reminder.reminderType} on {reminder.appointmentDate} at {reminder.appointmentTime}
                        <br />
                        Venue: {reminder.venue}, Duration: {reminder.duration}
                        <br />
                        Message: {reminder.messageTemplate}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Schedulling;
