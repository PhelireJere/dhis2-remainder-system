import React, { useState, useEffect } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import "./PatientList.css";
import { CircularLoader, NoticeBox, Table, TableHead, TableRow, TableCell, TableBody } from "@dhis2/ui";
import { fetchPatients } from "./Api";

const orgUnitQuery = {
  organisationUnits: {
    resource: "organisationUnits.json",
    params: {
      level: 2,
      fields: "id,name",
      paging: false,
    },
  },
};

const PatientList = () => {
  const [orgUnit, setOrgUnit] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { data: orgData, error: orgError, loading: loadingOrgUnits } = useDataQuery(orgUnitQuery);

  const handleOrgUnitChange = async (e) => {
    const selectedOrgUnit = e.target.value;
    setOrgUnit(selectedOrgUnit);

    if (selectedOrgUnit) {
      setLoading(true);
      setError(null);
      try {
        const fetchedPatients = await fetchPatients(selectedOrgUnit);
        setPatients(fetchedPatients);
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError("Failed to fetch patients. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loadingOrgUnits) return (
    <div className="loader">
      <CircularLoader /> <p>Loading organization units. Please wait...</p>
    </div>
  );

  if (orgError) return <div>Error fetching organization units</div>;

  return (
    <div className="patient-list">
      <h2>Patient List</h2>
      <select onChange={handleOrgUnitChange} value={orgUnit} required>
        <option value="">Select Organization Unit</option>
        {orgData?.organisationUnits?.organisationUnits?.map((unit) => (
          <option key={unit.id} value={unit.id}>
            {unit.name}
          </option>
        ))}
      </select>

      {loading && <CircularLoader />}
      
      {error && (
        <NoticeBox title="Error" error>
          {error}
        </NoticeBox>
      )}

      {!loading && patients.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.trackedEntityInstance}>
                <TableCell>{patient.firstName}</TableCell>
                <TableCell>{patient.lastName}</TableCell>
                <TableCell>{patient.dob}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {!loading && patients.length === 0 && orgUnit && (
        <p>No patients found for the selected organization unit.</p>
      )}
    </div>
  );
};

export default PatientList;
