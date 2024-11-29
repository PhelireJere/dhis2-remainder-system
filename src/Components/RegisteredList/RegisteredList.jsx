import React, { useState, useEffect } from 'react';
import { useDataQuery } from '@dhis2/app-runtime';
import { 
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCellHead,
  Button,
  Input,
  CircularLoader,
  Modal,
  ModalTitle,
  ModalContent,
  ModalActions,
  ButtonStrip,
  Card,
  Tag,
} from '@dhis2/ui';

// Dynamic query function
const createPatientsQuery = (programId, page, pageSize) => ({
  patients: {
    resource: 'trackedEntityInstances',
    params: {
      program: programId,
      ouMode: 'ACCESSIBLE',
      fields: 'attributes,created,orgUnit,trackedEntityInstance',
      pageSize,
      page,
    },
  },
});

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'created', direction: 'desc' });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 10;

  const programId = 'aDE0NeG4q0n';

  // Query to fetch patients
  const { loading, error, data, refetch } = useDataQuery(
    createPatientsQuery(programId, currentPage, patientsPerPage)
  );

  // Process data when fetched
  useEffect(() => {
    if (data?.patients?.trackedEntityInstances) {
      const formattedPatients = data.patients.trackedEntityInstances.map((patient) => {
        const attributes = {};
        patient.attributes.forEach((attr) => {
          if (attr.displayName === 'First Name') {
            attributes.firstName = attr.value || 'N/A';
          } else if (attr.displayName === 'Last Name') {
            attributes.lastName = attr.value || 'N/A';
          } else if (attr.displayName === 'Gender') {
            attributes.gender = attr.value || 'N/A';
          } else if (attr.displayName === 'Date of Birth') {
            attributes.dob = attr.value || 'N/A';
          } else if (attr.displayName === 'Phone') {
            attributes.phone = attr.value || 'N/A';
          } else if (attr.displayName === 'Address') {
            attributes.address = attr.value || 'N/A';
          }
        });
        return {
          id: patient.trackedEntityInstance,
          created: new Date(patient.created).toLocaleDateString(),
          orgUnit: patient.orgUnit,
          ...attributes,
        };
      });
      setPatients(formattedPatients);
      setFilteredPatients(formattedPatients);
    }
  }, [data]);

  // Handle search
  useEffect(() => {
    const results = patients.filter((patient) =>
      Object.values(patient).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredPatients(results);
    setCurrentPage(1); // Reset to page 1 on search
  }, [searchTerm, patients]);

  // Handle sorting
  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });

    const sorted = [...filteredPatients].sort((a, b) => {
      const valueA = a[key] || '';
      const valueB = b[key] || '';
      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredPatients(sorted);
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    refetch(createPatientsQuery(programId, newPage, patientsPerPage));
  };

  // Modal handlers
  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <CircularLoader />
        <p>Loading patients...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="error-message">
          Error loading patients: {error.message}
        </div>
      </Card>
    );
  }

  return (
    <div className="patient-list">
      <Card>
        <div className="patient-list-header">
          <h2>Registered Patients</h2>
          <Input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={({ value }) => setSearchTerm(value)}
            className="search-input"
          />
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableCellHead onClick={() => handleSort('firstName')}>
                First Name {sortConfig.key === 'firstName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableCellHead>
              <TableCellHead onClick={() => handleSort('lastName')}>
                Last Name {sortConfig.key === 'lastName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableCellHead>
              <TableCellHead>Gender</TableCellHead>
              <TableCellHead onClick={() => handleSort('created')}>
                Registration Date {sortConfig.key === 'created' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableCellHead>
              <TableCellHead>Actions</TableCellHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.firstName}</TableCell>
                <TableCell>{patient.lastName}</TableCell>
                <TableCell>
                  <Tag>{patient.gender}</Tag>
                </TableCell>
                <TableCell>{patient.created}</TableCell>
                <TableCell>
                  <Button
                    small
                    onClick={() => handleViewDetails(patient)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="pagination">
          <ButtonStrip>
            <Button
              small
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <span>Page {currentPage} of {Math.ceil(filteredPatients.length / patientsPerPage)}</span>
            <Button
              small
              disabled={filteredPatients.length < patientsPerPage}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </ButtonStrip>
        </div>
      </Card>

      {/* Patient Details Modal */}
      {isModalOpen && selectedPatient && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <ModalTitle>Patient Details</ModalTitle>
          <ModalContent>
            <div className="patient-details">
              <div className="detail-row">
                <strong>First Name:</strong> {selectedPatient.firstName || 'N/A'}
              </div>
              <div className="detail-row">
                <strong>Last Name:</strong> {selectedPatient.lastName || 'N/A'}
              </div>
              <div className="detail-row">
                <strong>Gender:</strong> {selectedPatient.gender || 'N/A'}
              </div>
              <div className="detail-row">
                <strong>Date of Birth:</strong> {selectedPatient.dob || 'N/A'}
              </div>
              <div className="detail-row">
                <strong>Phone:</strong> {selectedPatient.phone || 'N/A'}
              </div>
              <div className="detail-row">
                <strong>Address:</strong> {selectedPatient.address || 'N/A'}
              </div>
              <div className="detail-row">
                <strong>Registration Date:</strong> {selectedPatient.created || 'N/A'}
              </div>
            </div>
          </ModalContent>
          <ModalActions>
            <ButtonStrip>
              <Button onClick={() => setIsModalOpen(false)}>Close</Button>
            </ButtonStrip>
          </ModalActions>
        </Modal>
      )}
    </div>
  );
};

export default PatientList;