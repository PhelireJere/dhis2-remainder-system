import React, { useState } from 'react';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        
        gender: '',
        phoneNumber: ''
    });

    const [patients, setPatients] = useState([]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPatients([...patients, formData]);
        setFormData({
            firstName: '',
            lastName: '',
            age: '',
            gender: '',
            phoneNumber: ''
        });
    };

    const handleCancel = () => {
        setFormData({
            firstName: '',
            lastName: '',
            age: '',
            gender: '',
            phoneNumber: ''
        });
    };

    return (
        <div className="container">
            <h1>Patient Registration</h1>
            <form id="patientForm" onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} required />
                
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} required />
                
                <label htmlFor="age">Age:</label>
                <input type="number" id="age" value={formData.age} onChange={handleChange} required />
                
                <label htmlFor="gender">Gender:</label>
                <select id="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input type="tel" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                
                <button type="submit">Register</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
            
            <h2>Registered Patients</h2>
            <ul>
                {patients.map((patient, index) => (
                    <li key={index}>
                        {patient.firstName} {patient.lastName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Register;
