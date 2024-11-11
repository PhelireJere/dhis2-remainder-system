document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const patientName = document.getElementById('patientName').value;
    const contactNumber = document.getElementById('contactNumber').value;
    const emailAddress = document.getElementById('emailAddress').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const medicalRecordNumber = document.getElementById('medicalRecordNumber').value;
    const appointmentType = document.getElementById('appointmentType').value;
    const reminderType = document.getElementById('reminderType').value;
    const services = document.getElementById('services').value;
    const location = document.getElementById('location').value;
    const doctor = document.getElementById('doctor').value;
    const department = document.getElementById('department').value;
    const duration = document.getElementById('duration').value;
    const specialInstructions = document.getElementById('specialInstructions').value;
    const appointmentDate = document.getElementById('appointmentDate').value;

    const appointmentList = document.getElementById('appointmentList');
    const listItem = document.createElement('li');
    listItem.textContent = `${patientName} - ${contactNumber} - ${emailAddress} - ${dateOfBirth} - ${medicalRecordNumber} - ${appointmentType} - ${reminderType} - ${services} - ${location} - ${doctor} - ${department} - ${duration} - ${specialInstructions} - ${appointmentDate}`;
    appointmentList.appendChild(listItem);

    document.getElementById('appointmentForm').reset();
});
