// Mock database for vitals
let vitals = [];

// Function to generate a unique VitalsCaptureID
const generateVitalsCaptureID = () => {
  return `VC${Date.now()}`;
};

// Function to update an existing vitals record by `VitalsCaptureID`
export const updateVitalsInDB = async (vitalsData) => {
  const vitalsIndex = vitals.findIndex((v) => v.VitalsCaptureID === vitalsData.VitalsCaptureID);

  if (vitalsIndex !== -1) {
    // Update the existing vitals record
    vitals[vitalsIndex] = { ...vitals[vitalsIndex], ...vitalsData };
    console.log("Vitals data updated successfully:", vitals[vitalsIndex]);
    return vitals[vitalsIndex];
  } else {
    // If VitalsCaptureID is not found, treat it as a new record
    return await createVitalsEncounter(vitalsData);
  }
};

// Function to create a new vitals encounter
export const createVitalsEncounter = async (vitalsData) => {
  const newVitalsData = {
    ...vitalsData,
    VitalsCaptureID: generateVitalsCaptureID(), // Generate unique ID
    DateOfCapture: new Date().toISOString().split("T")[0], // Current date (YYYY-MM-DD)
    TimeOfCapture: new Date().toISOString().split("T")[1].split(".")[0], // Current time (HH:MM:SS)
  };

  // Add the new vitals data to the mock database
  vitals.push(newVitalsData);
  console.log("New vitals encounter created:", newVitalsData);
  return newVitalsData;
};

// Function to get all vitals records for a specific `PatientID`
export const getVitalsByPatientID = async (patientID) => {
  const patientVitals = vitals.filter((v) => v.PatientID === patientID);
  console.log(`Vitals records for PatientID ${patientID}:`, patientVitals);
  return patientVitals;
};
