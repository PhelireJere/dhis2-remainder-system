import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'src/Components/Register.css';

const Register = ({ setFormData}) => {
    const [formData, setLocalFormData] = useState({ firstName: '', lastName: '', gender: '', age: '', phoneNumber: ''});
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = localStorage.getItem('formData');
        if(storedData) {
            setLocalFormData(JSON.parse(storedData));
        }
    }, []);

    const handleChange = (e) => {
        const {name,value} = e.target;
        const updatedFormData = {
            ...formData,
            [name]:value
        };
        setLocalFormData(updatedFormData);
        localStorage.setItem('formData', JSON.stringify(updatedFormData));
    };

     
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData(formData)
        navigate('/registeration-list');  
    };

    return (
          <div class = "form-wrapper">
           <h1 className="heading">Register</h1>
            <div className = "container">
              <form onSubmit={handleSubmit} >
                
                <div className = "input-group">
                  <label htmlFor="firstName" className="label">
                     First Name: 
                   <input type = "text" name = "firstName" value = {formData.firstName} onChange = {handleChange} className="input" />
                  </label>
                </div>
                <br/>

                <div className = "input-group">
                  <label htmlFor="lastName" className="label">
                     Last Name: 
                     <input type = "text" name = "lastName" value = {formData.lastName} onChange = {handleChange} className="input"/>
                  </label>
                </div>
                <br/>

                <div className = "input-group">
                  <label  htmlFor="gender" className="label">
                    Gender: 
                    <input type = "text" name = "gender" value = {formData.gender} onChange = {handleChange} className="input"/>
                  </label>
                </div>
                <br/>

                <div className = "input-group">
                  <label  htmlFor="age" className="label">
                    Age: 
                    <input type = "number" name = "age" value = {formData.age} onChange = {handleChange} className="input"/>
                  </label>
                </div>
                <br/>

                <div className = "input-group">
                    <label htmlFor="phone Number" className="label">
                        Phone Number:
                        <input type = "number" name="phone number" value = {formData.phoneNumber} onChange = {handleChange} className="input" /> 
                  </label>
                </div>

               <button className = "button" type = "submit">Register</button>
             </form>
             </div>
  
          </div>
      
    );
};
export default Register;
