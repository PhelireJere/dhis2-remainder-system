import React, { useState, useCallback, useMemo } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { registerPatient } from "./Api";
import "./Register.css";
import { Button, NoticeBox, CircularLoader } from "@dhis2/ui";

// Separate query configuration
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

// Initial form state as a constant
const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  phone: "",
  address: "",
  orgUnit: "",
};

// Validation function
const validateForm = (formData) => {
  const errors = {};
  
  // Required field validation
  const requiredFields = ['firstName', 'lastName', 'dob', 'gender', 'phone', 'orgUnit'];
  requiredFields.forEach(field => {
    if (!formData[field] || formData[field].trim() === '') {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  });

  //Phone number validation
  const phoneRegex = /^[0-9]{10}$/;
  if (formData.phone && !phoneRegex.test(formData.phone)) {
    errors.phone = "Phone number must be 10 digits";
  }

  // Date of birth validation
  const currentDate = new Date();
  const dobDate = new Date(formData.dob);
  if (dobDate > currentDate) {
    errors.dob = "Date of birth cannot be in the future";
  }

  return errors;
};

const Register = () => {
  // State management with more descriptive state
  const [formData, setFormData] = useState({ ...INITIAL_FORM_STATE });
  const [formErrors, setFormErrors] = useState({});
  const [registrationStatus, setRegistrationStatus] = useState({
    isLoading: false,
    isSuccess: false,
    errorMessage: null,
  });

  // Fetch organization units
  const { loading: orgUnitsLoading, error: orgUnitsError, data } = useDataQuery(orgUnitQuery);

  // Memoized organization units to prevent unnecessary re-renders
  const orgUnits = useMemo(() => 
    data?.organisationUnits?.organisationUnits || [], 
    [data]
  );

  // Unified change handler with error clearing
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'radio' ? (checked ? value : prevData[name]) : value
    }));

    // Clear specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [formErrors]);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setFormData({ ...INITIAL_FORM_STATE });
    setFormErrors({});
    setRegistrationStatus({
      isLoading: false,
      isSuccess: false,
      errorMessage: null,
    });
  }, []);

  // Submission handler with comprehensive validation
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm(formData);
    
    // If there are validation errors, set them and prevent submission
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    // Set loading state
    setRegistrationStatus({
      isLoading: true,
      isSuccess: false,
      errorMessage: null,
    });

    try {
      const response = await registerPatient(formData);
      
      if (response.status === "OK") {
        setRegistrationStatus({
          isLoading: false,
          isSuccess: true,
          errorMessage: null,
        });
        
        // Reset form after successful submission
        resetForm();
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (error) {
      setRegistrationStatus({
        isLoading: false,
        isSuccess: false,
        errorMessage: error.message || "An unexpected error occurred",
      });
    }
  }, [formData, resetForm]);

  // Loading state for organization units
  if (orgUnitsLoading) return (
    <div className="loader">
      <CircularLoader /> 
      <p>Fetching organization units. Please wait...</p>
    </div>
  );

  // Error state for organization units
  if (orgUnitsError) return (
    <NoticeBox error title="Error">
      Unable to fetch organization units. Please try again later.
    </NoticeBox>
  );

  return (
    <div className="register-form">
      <h2>Register Patient</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {formErrors.firstName && <p className="error">{formErrors.firstName}</p>}
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {formErrors.lastName && <p className="error">{formErrors.lastName}</p>}
        </div>
        <div>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
          {formErrors.dob && <p className="error">{formErrors.dob}</p>}
        </div>
        <div className="gender-group">
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
          {formErrors.gender && <p className="error">{formErrors.gender}</p>}
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {formErrors.phone && <p className="error">{formErrors.phone}</p>}
        </div>
        <div>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
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
          {formErrors.orgUnit && <p className="error">{formErrors.orgUnit}</p>}
        </div>

        <Button 
          type="submit" 
          disabled={registrationStatus.isLoading}
          loading={registrationStatus.isLoading}
        >
          {registrationStatus.isLoading ? "Registering..." : "Register"}
        </Button>

        <Button type="button" onClick={resetForm}>
          Cancel
        </Button>

        {registrationStatus.isSuccess && (
          <NoticeBox title="Success" success>
            Patient Registered successfully!
          </NoticeBox>
        )}

        {registrationStatus.errorMessage && (
          <NoticeBox title="Error" error>
            {registrationStatus.errorMessage}
          </NoticeBox>
        )}
      </form>
    </div>
  );
};

export default Register;