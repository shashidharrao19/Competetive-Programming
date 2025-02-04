// src/controllers/dashboardController.js

// Mock data for ER status
const erStatus = {
  patientsInER: 25,
  avgWait: 35,
  maxWait: 90,
  bedsOccupied: 18,
  bedsAvailable: 5,
  bedsCleaning: 3,
  staffOnDuty: { doctors: 5, nurses: 10 },
  triageDistribution: {
    critical: 3,
    urgent: 7,
    lessUrgent: 10,
    totalTriage: 20,
  },
};

// Mock data for ER metrics
const erMetrics = {
  currentDate: new Date().toLocaleDateString(),
  avgDoorToDoorTime: 45,
  totalPatientsSeen: 120,
  totalPatientsSeenChange: 15,
  admissionRate: 30,
  leftWithoutSeen: 5,
  leftWithoutSeenChange: 20,
  patientSatisfaction: 92,
  patientSatisfactionChange: 3,
  avgTreatmentTime: 28,
  avgTreatmentTimeChange: -5,
  resourceUtilization: 85,
  resourceUtilizationChange: 2,
  readmissionRate: 4.5,
  readmissionRateChange: 1,
};

// Mock data for staff status
const staffStatus = {
  doctors: 10,
  nurses: 20,
};

// Function to get current ER status
export const getCurrentStatus = (req, res) => {
  try {
    res.json(erStatus);
  } catch (error) {
    console.error('Error fetching ER status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Function to get ER metrics
export const getMetrics = (req, res) => {
  try {
    res.json(erMetrics);
  } catch (error) {
    console.error('Error fetching ER metrics:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Function to get staff status
export const getStaff = (req, res) => {
  try {
    res.json(staffStatus);
  } catch (error) {
    console.error('Error fetching staff status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
