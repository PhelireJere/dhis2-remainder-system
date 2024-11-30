const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

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

// Function to schedule an appointment in DHIS2
const scheduleAppointment = async (appointmentData) => {
    const { patient, orgUnit, appointmentDate, appointmentTime, purpose } = appointmentData;

    const data = {
        trackedEntityInstance: patient, // The patient being scheduled
        orgUnit: orgUnit, // Organization Unit where the appointment will take place
        eventDate: `${appointmentDate}T${appointmentTime}:00.000`, // Format the appointment date and time
        status: "SCHEDULED", // Assuming the appointment is scheduled in DHIS2
        program: "YOUR_PROGRAM_ID", // Replace with the actual Program ID for appointment scheduling
        programStage: "YOUR_PROGRAM_STAGE_ID", // Replace with the actual Program Stage ID for appointment scheduling
        dataValues: [
            { dataElement: "APPOINTMENT_PURPOSE_DE_ID", value: purpose }, // Replace with actual data element ID for the purpose
        ],
    };

    try {
        // Post the appointment data to DHIS2 to schedule the appointment
        const response = await api.post('/events', data);
        return response.data; // Return the response data
    } catch (error) {
        console.error("Error scheduling appointment:", error);
        throw error; // Propagate the error if something goes wrong
    }
};

// Mock DHIS2 API endpoints

// Fetch patients
app.get('/api/patients', async (req, res) => {
    try {
        const response = await api.get('/trackedEntityInstances', {
            params: {
                program: 'YOUR_PROGRAM_ID', // Replace with your program ID
                orgUnit: 'YOUR_ORG_UNIT_ID', // Replace with your organization unit ID
                fields: 'trackedEntityInstance,attributes[attribute,value]',
                paging: false,
            },
        });
        const patients = response.data.trackedEntityInstances.map(instance => ({
            id: instance.trackedEntityInstance,
            name: instance.attributes.find(attr => attr.attribute === 'YOUR_NAME_ATTRIBUTE_ID').value, // Replace with your name attribute ID
        }));
        res.json(patients);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).send('Error fetching patients');
    }
});

// Fetch organization units
app.get('/api/orgUnits', async (req, res) => {
    try {
        const response = await api.get('/organisationUnits', {
            params: {
                level: 2,
                fields: 'id,name',
                paging: false,
            },
        });
        res.json(response.data.organisationUnits);
    } catch (error) {
        console.error('Error fetching organization units:', error);
        res.status(500).send('Error fetching organization units');
    }
});

// Schedule reminder
app.post('/api/schedule', async (req, res) => {
    try {
        const data = await scheduleAppointment(req.body);
        res.status(200).send(data);
    } catch (error) {
        console.error('Error scheduling reminder:', error);
        res.status(500).send('Error scheduling reminder');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
