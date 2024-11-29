import React, { useState, useEffect } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { registerPatient } from "./Api";
import "./Register.css";
import { Button, NoticeBox, CircularLoader } from "@dhis2/ui";


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

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    address: "",
    orgUnit: "", 
  });

  const [orgUnits, setOrgUnits] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);
  const [loadingOrgUnits, setLoadingOrgUnits] = useState(true); 
  const [loadingPatient, setLoadingPatient] = useState(false); 

  
  const { data, error } = useDataQuery(orgUnitQuery);

  useEffect(() => {
    if (data) {
      const fetchedOrgUnits = data.organisationUnits.organisationUnits || [];
      setOrgUnits(fetchedOrgUnits); 
      setLoadingOrgUnits(false); 
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingPatient(true); 

    try {
      const response = await registerPatient(formData); 
      if (response.status === "OK") {
        setEnrollmentSuccess(true);
      }
    } catch (error) {
      console.error("Error registering patient:", error);
      alert("Error registering patient");
    } finally {
      setLoadingPatient(false); 
    }
  };

  if (loadingOrgUnits) return (
    <div className="loader">
      <CircularLoader /> <p>Loading organization units. Please wait...</p>
    </div>
  );

  if (error) return <div>Error fetching organization units</div>;

  return (
    <div className="register-form">
      <h2>Register Patient</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          value={formData.firstName}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          value={formData.lastName}
          required
        />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          onChange={handleChange}
          value={formData.dob}
          required
        />
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={handleChange}
              checked={formData.gender === "Male"}
              required
            /> Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={handleChange}
              checked={formData.gender === "Female"}
              required
            /> Female
          </label>
        </div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          value={formData.phone}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          value={formData.address}
        />
        <select name="orgUnit" onChange={handleChange} value={formData.orgUnit} required>
          <option value="">Select Organization Unit</option>
          {orgUnits.length > 0 ? (
            orgUnits.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))
          ) : (
            <option disabled>No organization units available</option>
          )}
        </select>

       
        <Button type="submit" disabled={loadingPatient} loading={loadingPatient}>
          {loadingPatient ? "Registering..." : "Register"}
        </Button>

        {enrollmentSuccess && (
          <NoticeBox title="Success" success>
            Patient Registered successfully!
          </NoticeBox>
        )}

       
        <button type="reset" onClick={() => setFormData({})}>Cancel</button>
      </form>
    </div>
  );
};

export default Register;
