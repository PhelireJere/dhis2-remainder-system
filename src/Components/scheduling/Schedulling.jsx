import React, { useState, useEffect } from "react";
import axios from "axios";
import "./scheduling.css";
import { Button, NoticeBox, CircularLoader } from "@dhis2/ui";

const Schedulling = () => {
    const [formData, setFormData] = useState({
        patientId: "",
        date: "",
        time: "",
        message: "",
        orgUnit: "",
        venue: "",
        duration: "",
        doctor: "",
    });

    const [orgUnits, setOrgUnits] = useState([]);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [schedulingSuccess, setSchedulingSuccess] = useState(false);

    useEffect(() => {
        const fetchOrgUnits = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/orgUnits");
                setOrgUnits(response.data);
            } catch (error) {
                console.error("Error fetching organization units:", error);
            }
        };
        
        const fetchPatients = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/patients");
                setPatients(response.data);
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };

        fetchOrgUnits();
        fetchPatients();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:3000/api/schedule", formData);
            if (response.data.status === "OK") {
                setSchedulingSuccess(true);
            }
        } catch (error) {
            console.error("Error scheduling reminder:", error);
            alert("Error scheduling reminder");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="scheduling-form">
            <h2>Schedule Reminder</h2>
            <form onSubmit={handleSubmit}>
                <select name="patientId" onChange={handleChange} required>
                    <option value="">Select Patient</option>
                    {patients.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                            {patient.name}
                        </option>
                    ))}
                </select>
                <input
                    type="date"
                    name="date"
                    placeholder="Date"
                    onChange={handleChange}
                    required
                />
                <input
                    type="time"
                    name="time"
                    placeholder="Time"
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="message"
                    placeholder="Message"
                    onChange={handleChange}
                    rows="4"
                    required
                />
                <select name="orgUnit" onChange={handleChange} required>
                    <option value="">Select Organization Unit</option>
                    {orgUnits.map((unit) => (
                        <option key={unit.id} value={unit.id}>
                            {unit.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    name="venue"
                    placeholder="Venue"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="duration"
                    placeholder="Duration"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="doctor"
                    placeholder="Doctor"
                    onChange={handleChange}
                    required
                />

                <Button type="submit" disabled={loading} loading={loading}>
                    {loading ? "Scheduling..." : "Schedule Reminder"}
                </Button>

                {schedulingSuccess && (
                    <NoticeBox title="Success" success>
                        Reminder scheduled successfully!
                    </NoticeBox>
                )}

                <button type="reset">Cancel</button>
            </form>
        </div>
    );
};

export default Schedulling;
