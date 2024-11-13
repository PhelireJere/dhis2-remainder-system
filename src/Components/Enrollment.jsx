// PatientEnrollment.js
import React, { useState } from 'react';
import './Enrollment.css';

function Enrollment() {
  const [patient, setPatient] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({
      ...patient,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Enrolling patient:', patient);
    // Here you can make a POST request to your backend API to enroll the patient
    alert("Patient enrolled successfully!");
  };

  return (
    <div className="enrollment-container">
      <h2>Enroll Patient</h2>
      <form onSubmit={handleSubmit} className="enrollment-form">
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={patient.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={patient.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={patient.age}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Gender:
          <select
            name="gender"
            value={patient.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <button type="submit">Enroll</button>
      </form>
    </div>
  );
}

export default Enrollment;
 