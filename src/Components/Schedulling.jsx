import React, { useState } from 'react';
import './scheduling.css';

const Schedulling = () => {
    const [formData, setFormData] = useState({
        patientName: '',
        contactNumber: '',
        emailAddress: '',
        dateOfBirth: '',
        medicalRecordNumber: '',
        appointmentType: '',
        reminderType: '',
        services: '',
        location: '',
        doctor: '',
        department: '',
        duration: '',
        specialInstructions: '',
        appointmentDate: ''
    });

    const [appointments, setAppointments] = useState([]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setAppointments([...appointments, formData]);
        setFormData({
            patientName: '',
            contactNumber: '',
            emailAddress: '',
            dateOfBirth: '',
            medicalRecordNumber: '',
            appointmentType: '',
            reminderType: '',
            services: '',
            location: '',
            doctor: '',
            department: '',
            duration: '',
            specialInstructions: '',
            appointmentDate: ''
        });
    };

    const handleCancel = () => {
        setFormData({
            patientName: '',
            contactNumber: '',
            emailAddress: '',
            dateOfBirth: '',
            medicalRecordNumber: '',
            appointmentType: '',
            reminderType: '',
            services: '',
            location: '',
            doctor: '',
            department: '',
            duration: '',
            specialInstructions: '',
            appointmentDate: ''
        });
    };

    return (
        <div className="container">
            <h1> Appointment Scheduling</h1>
            <form id="appointmentForm" onSubmit={handleSubmit}>
                <label htmlFor="patientName">Patient Name:</label>
                <input type="text" id="patientName" value={formData.patientName} onChange={handleChange} required />
                
                <label htmlFor="contactNumber">Contact Number:</label>
                <input type="tel" id="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
                
                <label htmlFor="emailAddress">Email Address (optional):</label>
                <input type="email" id="emailAddress" value={formData.emailAddress} onChange={handleChange} />
                
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input type="date" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                
                <label htmlFor="medicalRecordNumber">Medical Record Number:</label>
                <input type="text" id="medicalRecordNumber" value={formData.medicalRecordNumber} onChange={handleChange} required />
                
                <label htmlFor="appointmentType">Appointment Type:</label>
                <select id="appointmentType" value={formData.appointmentType} onChange={handleChange} required>
                    <option value="General Check-up">General Check-up</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Lab Test">Lab Test</option>
                    <option value="Vaccination">Vaccination</option>
                    <option value="Physical Therapy">Physical Therapy</option>
                    <option value="Emergency">Emergency</option>
                </select>
                
                <label htmlFor="reminderType">Reminder Type:</label>
                <select id="reminderType" value={formData.reminderType} onChange={handleChange} required>
                    <option value="Email">Email</option>
                    <option value="SMS">SMS</option>
                    <option value="Phone Call">Phone Call</option>
                </select>
                
                <label htmlFor="services">Services/Procedure:</label>
                <select id="services" value={formData.services} onChange={handleChange} required>
                    <option value="Blood Test">Blood Test</option>
                    <option value="X-Ray">X-Ray</option>
                    <option value="MRI Scan">MRI Scan</option>
                    <option value="Ultrasound">Ultrasound</option>
                    <option value="Vaccination">Vaccination</option>
                    <option value="Physical Therapy">Physical Therapy</option>
                    <option value="Surgery">Surgery</option>
                    <option value="Dental Check-up">Dental Check-up</option>
                    <option value="Eye Examination">Eye Examination</option>
                    <option value="Cardiology Consultation">Cardiology Consultation</option>
                </select>
                
                <label htmlFor="location">Location:</label>
                <input type="text" id="location" value={formData.location} onChange={handleChange} required />
                
                <label htmlFor="doctor">Doctor:</label>
                <input type="text" id="doctor" value={formData.doctor} onChange={handleChange} required />
                
                <label htmlFor="department">Department:</label>
                <select id="department" value={formData.department} onChange={handleChange} required>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Emergency Medicine">Emergency Medicine</option>
                    <option value="Endocrinology">Endocrinology</option>
                    <option value="Gastroenterology">Gastroenterology</option>
                    <option value="General Surgery">General Surgery</option>
                    <option value="Gynecology">Gynecology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Psychiatry">Psychiatry</option>
                    <option value="Radiology">Radiology</option>
                    <option value="Urology">Urology</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                </select>
                
                <label htmlFor="duration">Duration:</label>
                <input type="text" id="duration" value={formData.duration} onChange={handleChange} required />
                
                <label htmlFor="specialInstructions">Special Instructions:</label>
                <input type="text" id="specialInstructions" value={formData.specialInstructions} onChange={handleChange} />
                
                <label htmlFor="appointmentDate">Appointment Date:</label>
                <input type="date" id="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required />
                
                <button type="submit" className="add-appointment">Add Appointment</button>
                <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>
            </form>
            <h2>Appointments</h2>
            <ul id="appointmentList">
                {appointments.map((appointment, index) => (
                    <li key={index}>
                        {appointment.patientName} - {appointment.appointmentType} on {appointment.appointmentDate}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Schedulling;