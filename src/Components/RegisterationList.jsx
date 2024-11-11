import React, {useState, useEffect} from 'react';

const RegisterationList= () => {
  const [registeredPtients, setRegisteredPatients] = useState([]);


  useEffect(() => {
    const storedData = localStorage.getItem('registeredPatients');
    if (storedData) {
      setRegisteredPatients(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className = "bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto my-8">
       <h2 className='text-2xl text-blue-800 font-semibold mb-4 center'>Registered Patients </h2>
           
           {registeredPatients.length > 0 ? 
             (registeredPatients.map((patient, index) => (
          
              <div className ="bg-white rounded-lg shadow p-6">
                 <p><strong>First Name: </strong>{patient.firstName}</p>
                 <p><strong>Last Name: </strong>{patient.lastName}</p>
              </div>
             ))
            ) : (
              <p className='text-center text-gray-600'>No registered patients</p>
            )}

    </div>
  );
};


export default RegisterationList;
