
// Mock data for demonstration
import { savePatient, getAllPatients }  from '../tables/patientTable.js'
import { updatePatientInDB } from '../tables/patientTable.js';

const mockPatients = [
    {
      id: 1,
      name: "John Doe",
      age: 45,
      triagelevel: "I",
      time: "09:30 AM",
      status: "In Treatment",
      staff: "Dr. Smith",
      careathway: "Cardiac",
      progress: "75%",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 32,
      triagelevel: "II",
      time: "10:15 AM",
      status: "Waiting",
      staff: "Nurse Johnson",
      careathway: "Orthopedic",
      progress: "25%",
    },
    {
      id: 3,
      name: "Bob Brown",
      age: 58,
      triagelevel: "III",
      time: "11:00 AM",
      status: "Discharged",
      staff: "Dr. Lee",
      careathway: "General",
      progress: "100%",
    },
    {
      id: 4,
      name: "Alice Green",
      age: 27,
      triagelevel: "II",
      time: "09:45 AM",
      status: "In Treatment",
      staff: "Dr. Wilson",
      careathway: "Neurological",
      progress: "50%",
    },
    {
      id: 5,
      name: "Charlie Davis",
      age: 63,
      triagelevel: "I",
      time: "10:30 AM",
      status: "Waiting",
      staff: "Nurse Brown",
      careathway: "Respiratory",
      progress: "10%",
    },
  ];
  
export const getPatients = (req, res) => {
    try {
      // In a real application, you would query a database here
      res.json(mockPatients);
    } catch (error) {
      console.error('Error fetching patients:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  export const registerPatient = async (req, res) => {
    const patientData = req.body;
    try {
      // Call the savePatient function, which also creates an encounter
      const { newPatient, newEncounter } = await savePatient(patientData);
      res.status(201).json({
        message: "Patient registered and encounter created successfully",
        patient: newPatient,
        encounter: newEncounter,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };




export const updatePatientDetails = async (req, res) => {
  const patientData = req.body;

  try {
    // Validate the input data
    if (!patientData.patientID) {
      return res.status(400).json({ message: 'Patient ID is required for updating details.' });
    }

    // Update the patient data in the mock database (or real database)
    const updatedPatient = await updatePatientInDB(patientData);

    if (updatedPatient) {
      res.status(200).json({ message: 'Patient details updated successfully.', patient: updatedPatient });
    } else {
      res.status(404).json({ message: 'Patient not found.' });
    }
  } catch (error) {
    console.error('Error updating patient details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
