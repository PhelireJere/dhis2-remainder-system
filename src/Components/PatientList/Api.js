import axios from 'axios';

const api = axios.create({
  baseURL: 'https://data.research.dhis2.org/in5320/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + btoa('admin:district'),
  },
});

export const fetchPatients = async (orgUnitId) => {
  try {
    console.log('Fetching patients for orgUnit:', orgUnitId);

    const response = await api.get('/trackedEntityInstances.json', {
      params: {
        orgUnit: orgUnitId,
        fields: 'attributes[attribute,value],trackedEntityInstance',
        paging: false,
      },
    });

    console.log('API Response:', response.data);

    // Ensure response.data and trackedEntityInstances exist
    if (!response.data || !response.data.trackedEntityInstances) {
      console.warn('No tracked entity instances found');
      return [];
    }

    // Map response to extract patient details
    const patients = response.data.trackedEntityInstances.map((tei) => {
      const patientData = {
        trackedEntityInstance: tei.trackedEntityInstance,
      };

      tei.attributes.forEach((attribute) => {
        switch (attribute.attribute) {
          case 'w75KJ2mc4zz': // First Name
            patientData.firstName = attribute.value;
            break;
          case 'zDhUuAYrxNC': // Last Name
            patientData.lastName = attribute.value;
            break;
          case 'iESIqZ0R0R0': // DOB
            patientData.dob = attribute.value;
            break;
          case 'cejWyOfXge6': // Gender
            patientData.gender = attribute.value;
            break;
          case 'P2cwLGskgxn': // Phone
            patientData.phone = attribute.value;
            break;
          case 'VqEFza8wbwA': // Address
            patientData.address = attribute.value;
            break;
        }
      });

      return patientData;
    });

    return patients;
  } catch (error) {
    console.error('Error fetching patients:', error.response ? error.response.data : error.message);
    throw error;
  }
};