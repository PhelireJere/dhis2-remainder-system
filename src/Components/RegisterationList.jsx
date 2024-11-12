import React, {useState, useEffect} from 'react';
import 'src/Components/RegisterationList.css';

const RegisterationList= () => {
  const [formData, setFormData] = useState({firstName:'', lastName:'' });


  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className = "container">
       <h2 className='heading'>Registered Patients </h2>
           
              <div key={index}className ="patient-card">
                 <p><strong>First Name: </strong>{patient.firstName}</p>
                 <p><strong>Last Name: </strong>{patient.lastName}</p>
              </div>

    </div>
  );
};


export default RegisterationList;
