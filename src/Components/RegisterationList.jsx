import React, {useState, useEffect} from 'react';
import 'src/Components/RegisterationList.css';

const RegisterationList= () => {
  const [registeredPtients, setRegisteredPatients] = useState([]);


  useEffect(() => {
    const storedData = localStorage.getItem('registeredPatients');
    if (storedData) {
      setRegisteredPatients(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className = "container">
       <h2 className='heading'>Registered Patients </h2>
           
           {registeredPatients.length > 0 ? 
             (registeredPatients.map((patient, index) => (
          
              <div key={index}className ="patient-card">
                 <p><strong>First Name: </strong>{patient.firstName}</p>
                 <p><strong>Last Name: </strong>{patient.lastName}</p>
              </div>
             ))
            ) : (
              <p className='no-patients'>No registered patients</p>
            )}

    </div>
  );
};


export default RegisterationList;
