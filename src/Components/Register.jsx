import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

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

        const storedData = localStorage.getItem("registeredPatients");
        const patientsList = storedData ? JSON.parse(storedData) : [];
        
        patientsList.push(formData);

        localStorage.setItem("registeredPatients", JSON.stringify(patientsList));
        
        navigate('/registeration-list');  
    };

    return (
          <div class = "bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto my-8">
           <h1 className="text-2xl font-bold mb-4 text-center text-white-900">Register</h1>
            <div className = "flex items-center mb-4">
              <form onSubmit={handleSubmit} className="container mx-auto" >
                
                <div className = "mb-4">
                  <label htmlFor="firstName" className="font-semibold block text-blue-800">
                     First Name: 
                   <input type = "text" name = "firstName" value = {formData.firstName} onChange = {handleChange} className=" bg-green-600 border-black-950 rounded w-full px-3 py-2 text-gray-500" />
                  </label>
                </div>
                <br/>

                <div className = "mb-4">
                  <label htmlFor="lastName" className="font-semibold block text-blue-800">
                     Last Name: 
                     <input type = "text" name = "lastName" value = {formData.lastName} onChange = {handleChange} className="bg-green-600 border-black rounded w-full px-3 py-2 text-gray-500"/>
                  </label>
                </div>
                <br/>

                <div className = "mb-4">
                  <label  htmlFor="gender" className="font-semibold block text-blue-800">
                    Gender: 
                    <input type = "text" name = "gender" value = {formData.gender} onChange = {handleChange} className="bg-green-600 border-black rounded w-full px-3 py-2 text-gray-500"/>
                  </label>
                </div>
                <br/>

                <div className = "mb-4">
                  <label  htmlFor="age" className="font-semibold block text-blue-800">
                    Age: 
                    <input type = "number" name = "age" value = {formData.age} onChange = {handleChange} className="w-full px-3 py-2 border-black rounded"/>
                  </label>
                </div>
                <br/>

                <div className = "mb-4">
                    <label htmlFor="phone Number" className="font-semibold block text-blue-800">
                        Phone Number:
                        <input type = "number" name="phone number" value = {formData.phoneNumber} onChange = {handleChange} className="w-full px-3 py-2 border-black rounded" /> 
                  </label>
                </div>

               <button className = "bg-blue-900 text-white font-bold py-2 px-4 rounded text-center" type = "submit">Register</button>
             </form>
             </div>
  
          </div>
      
    );
};
export default Register;
