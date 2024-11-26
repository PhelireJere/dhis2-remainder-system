import React, { useState, useCallback, useMemo } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
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

const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  phone: "",
  address: "",
  orgUnit: "",
};

const Register = () => {
  const [formData, setFormData] = useState(() => ({ ...INITIAL_FORM_STATE }));
  const [registrationStatus, setRegistrationStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const { loading: orgUnitsLoading, error: orgUnitsError, data } = useDataQuery(orgUnitQuery);

  const orgUnits = useMemo(() => 
    data?.organisationUnits?.organisationUnits || [], 
    [data]
  );

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'radio' ? (checked ? value : prevData[name]) : value
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({ ...INITIAL_FORM_STATE });
    setRegistrationStatus({ loading: false, success: false, error: null });
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    const requiredFields = ['firstName', 'lastName', 'dob', 'gender', 'phone', 'orgUnit'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      setRegistrationStatus({
        loading: false,
        success: false,
        error: Please fill in all required fields: ${missingFields.join(', ')}
      });
      return;
    }

    setRegistrationStatus({ loading: true, success: false, error: null });

    try {
      const response = await registerPatient(formData);
      
      if (response.status === "OK") {
        setRegistrationStatus({ 
          loading: false, 
          success: true, 
          error: null 
        });
        resetForm();
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (error) {
      setRegistrationStatus({
        loading: false,
        success: false,
        error: error.message || "An unexpected error occurred"
      });
    }
  }, [formData, resetForm]);
 
  if (orgUnitsLoading) return (
    <div className="loader">
      <CircularLoader /> 
      <p>Fetching organization units. Please wait...</p>
    </div>
  );

  if (orgUnitsError) return (
    <NoticeBox error title="Error">
      Unable to fetch organization units. Please try again later.
    </NoticeBox>
  );

  return (
    <div className="register-form">
      <h2>Register Patient</h2>
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
              required
            />{" "}
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
              required
            />{" "}
            Female
          </label>
        </div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <select 
          name="orgUnit" 
          value={formData.orgUnit}
          onChange={handleChange} 
          required
        >
          <option value="">Select Organization Unit</option>
          {orgUnits.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.name}
            </option>
          ))}
        </select>

        <Button 
          type="submit" 
          disabled={registrationStatus.loading}
          loading={registrationStatus.loading}
        >
          {registrationStatus.loading ? "Registering..." : "Register"}
        </Button>

        <Button type="button" onClick={resetForm}>
          Cancel
        </Button>

        {registrationStatus.success && (
          <NoticeBox title="Success" success>
            Patient Registered successfully!
          </NoticeBox>
        )}

        {registrationStatus.error && (
          <NoticeBox title="Error" error>
            {registrationStatus.error}
          </NoticeBox>
        )}
      </form>
    </div>
  );
};

export default Register;