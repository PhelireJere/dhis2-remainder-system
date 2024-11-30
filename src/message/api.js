const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const api = axios.create({
    baseURL: "https://data.research.dhis2.org/in5320/api", // Replace with your DHIS2 instance URL
    headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from("admin:district").toString('base64'), // Replace with your credentials
    },
});

const messagesFilePath = path.join(__dirname, 'messages.json');

// Function to schedule an appointment in DHIS2
const scheduleAppointment = async (appointmentData) => {
    const { patient, orgUnit, appointmentDate, appointmentTime, purpose } = appointmentData;

    const data = {
        trackedEntityInstance: patient,
        orgUnit: orgUnit,
        eventDate: `${appointmentDate}T${appointmentTime}:00.000`,
        status: "SCHEDULED",
        program: "YOUR_PROGRAM_ID",
        programStage: "YOUR_PROGRAM_STAGE_ID",
        dataValues: [
            { dataElement: "APPOINTMENT_PURPOSE_DE_ID", value: purpose },
        ],
    };

    try {
        const response = await api.post('/events', data);
        return response.data;
    } catch (error) {
        console.error("Error scheduling appointment:", error);
        throw error;
    }
};

// Endpoint to fetch all messages
app.get('/api/messages', (req, res) => {
    fs.readFile(messagesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading messages:", err);
            res.status(500).send('Error reading messages');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint to send a message and save it
app.post('/api/schedule', async (req, res) => {
    try {
        const appointmentData = req.body;
        const data = await scheduleAppointment(appointmentData);
        
        // Save the message
        const message = {
            patient: appointmentData.patient,
            message: appointmentData.message,
            date: new Date().toISOString()
        };

        fs.readFile(messagesFilePath, 'utf8', (err, fileData) => {
            if (err && err.code !== 'ENOENT') {
                console.error("Error reading messages:", err);
                res.status(500).send('Error saving message');
                return;
            }

            const messages = fileData ? JSON.parse(fileData) : [];
            messages.push(message);

            fs.writeFile(messagesFilePath, JSON.stringify(messages, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error("Error writing message:", writeErr);
                    res.status(500).send('Error saving message');
                    return;
                }
                res.status(200).send(data);
            });
        });
    } catch (error) {
        console.error('Error scheduling reminder:', error);
        res.status(500).send('Error scheduling reminder');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
