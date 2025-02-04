// src/tables/patientTable.js

import { saveEncounter } from "./encounterTable.js";

// Mock Patient Database
let patients = [
  {
    firstName: "John",
    lastName: "Doe",
    dob: "2000-01-01",
    age: "22",
    gender: "male",
    address: "123 Main St",
    phoneNumber: "9852657462",
    emailId: "john.doe@example.com",
    emergencyContactName: "Jane Doe",
    emergencyContactNumber: "555-5678",
    insuranceName: "HealthCare Inc.",
    insuranceId: "HC123456",
    registrationStatus: "Completed",
    registrationDate: "2024-11-16",
    registrationTime: "17:43:14",
    patientID: "P1731778994287"
  },
  {
    firstName: "Alice",
    lastName: "Smith",
    dob: "1998-04-15",
    age: "24",
    gender: "female",
    address: "456 Elm St",
    phoneNumber: "8203671512",
    emailId: "alice.smith@example.com",
    emergencyContactName: "Bob Smith",
    emergencyContactNumber: "555-4321",
    insuranceName: "SecureHealth",
    insuranceId: "SH789012",
    registrationStatus: "Pending",
    registrationDate: "2024-11-16",
    registrationTime: "17:43:14",
    patientID: "P1731778994288"
  },
  {
    firstName: "Michael",
    lastName: "Johnson",
    dob: "1995-07-10",
    age: "27",
    gender: "male",
    address: "789 Maple Ave",
    phoneNumber: "9852637492",
    emailId: "michael.johnson@example.com",
    emergencyContactName: "Sarah Johnson",
    emergencyContactNumber: "555-0987",
    insuranceName: "PrimeHealth",
    insuranceId: "PH345678",
    registrationStatus: "Completed",
    registrationDate: "2024-11-16",
    registrationTime: "17:43:14",
    patientID: "P1731778994289"
  },
  
];

const generatePatientID = () => {
  return `P${Date.now()}`; // Uses current timestamp to ensure uniqueness
};

// Function to get all patients
export const getAllPatients = async () => {
  try {
    // Return the entire patient list
    return patients;
  } catch (error) {
    console.error("Error fetching all patients:", error);
    throw new Error("Failed to retrieve patient data.");
  }
};


// Function to save a new patient and create an encounter
export const savePatient = async (patientData) => {
  // Check for duplicate patient based on email or phone number
  const isDuplicate = patients.some(
    (patient) =>
      patient.emailId === patientData.emailId || patient.phoneNumber === patientData.phoneNumber
  );

  if (isDuplicate) {
    throw new Error("A patient with the same email or phone number already exists.");
  }

  // Generate a unique patient ID
  const newPatientID = generatePatientID();

  // Create the new patient record
  const newPatient = {
    ...patientData,
    patientID: newPatientID,
    registrationStatus: "Pending",
    registrationDate: new Date().toISOString().split("T")[0], // Format: YYYY-MM-DD
    registrationTime: new Date().toISOString().split("T")[1].split(".")[0], // Format: HH:MM:SS
  };

  // Add the new patient to the mock database
  patients.push(newPatient);
  console.log("New patient registered successfully:", newPatient);

  // Automatically create a new patient encounter record using `saveEncounter`
  const newEncounterData = {
    PatientID: newPatientID,
    CheckinDate: new Date().toISOString().split("T")[0],
    CheckinTime: new Date().toISOString().split("T")[1].split(".")[0],
  };

  try {
    const newEncounter = await saveEncounter(newEncounterData);
    console.log("New Patient Encounter created successfully:", newEncounter);

    // Return the new patient record along with the encounter record
    return { newPatient, newEncounter };
  } catch (error) {
    console.error("Error creating patient encounter:", error);
    throw new Error("Failed to create patient encounter.");
  }
};

// function to search the patient data

export const searchPatient = async (searchType, searchValue) => {
  switch (searchType) {
    case 'name':
      return patients.filter(
        (patient) =>
          `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchValue.toLowerCase())
      );
    case 'id':
      return patients.filter((patient) => patient.patientID === searchValue);
    case 'phone':
      return patients.filter((patient) => patient.phoneNumber === searchValue);
    default:
      return [];
  }
};


// Updating the patient Details

export const updatePatientInDB = async (patientData) => {
  const patientIndex = patients.findIndex((p) => p.patientID === patientData.patientID);

  if (patientIndex !== -1) {
    // Update the patient record
    patients[patientIndex] = { ...patients[patientIndex], ...patientData };
    return patients[patientIndex];
  }

  return null;
};
