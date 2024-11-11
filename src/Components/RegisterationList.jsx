import React, {useState, useEffect} from 'react';

const RegisterationList= () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', gender: '', age: '', phoneNumber:''});


  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className = "bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto my-8">
    
        <h2 className='text-2xl text-blue-800 font-semibold mb-4 center'>Registered Patients </h2>
          <div className ="bg-white rounded-lg shadow p-6">
            <p><strong>First Name: </strong>{formData.firstName}</p>
            <p><strong>Last Name: </strong>{formData.lastName}</p>
          </div>
    </div>
  );
};

export default RegisterationList;
