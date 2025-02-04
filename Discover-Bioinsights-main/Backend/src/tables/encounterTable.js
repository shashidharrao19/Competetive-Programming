// Mock database for encounters
let encounters = [
  {
    encounterID: "ENC1699484001001",
    patientID: "P1731778994287",
    checkinDate: "2024-11-16",
    checkinTime: "18:30:00",
    modeOfArrival: "Ambulance",
    returnWithin72Hours: "Yes",
    lastDischargeDate: "2024-10-30",
    chiefComplaintID: "CC01",
    informedBy: "Self",
    vitalsCaptureID: "VC101",
    knownAllergies: "Penicillin",
    bedNumber: "B101",
  },
  {
    encounterID: "ENC1699485002002",
    patientID: "P1731778994288",
    checkinDate: "2024-11-16",
    checkinTime: "19:15:00",
    modeOfArrival: "Private Vehicle",
    returnWithin72Hours: "No",
    lastDischargeDate: "2024-10-25",
    chiefComplaintID: "CC02",
    informedBy: "Attendant",
    vitalsCaptureID: "VC102",
    knownAllergies: "None",
    bedNumber: "B102",
  },
  {
    encounterID: "ENC1699486003003",
    patientID: "P1731778994289",
    checkinDate: "2024-11-16",
    checkinTime: "20:45:00",
    modeOfArrival: "Ambulance",
    returnWithin72Hours: "Yes",
    lastDischargeDate: "2024-11-01",
    chiefComplaintID: "CC03",
    informedBy: "Police",
    vitalsCaptureID: "VC103",
    knownAllergies: "Latex",
    bedNumber: "B103",
  },
];


// Function to save a new encounter
export const saveEncounter = async (encounterData) => {
  const newEncounter = {
    ...encounterData,
    encounterID: `ENC${Date.now()}`, // Generate unique encounter ID
  };
  encounters.push(newEncounter);
  return newEncounter;
};

// Function to update an existing encounter
export const updateEncounterByPatientID = async (updatedData) => {
  const encounterIndex = encounters.findIndex(
    (encounter) =>  encounter.PatientID == updatedData.PatientID
  );
console.log(encounterIndex);
  if (encounterIndex !== -1) {
    // Update the encounter record with the new data
    encounters[encounterIndex] = { ...encounters[encounterIndex], ...updatedData };
    console.log("Encounter updated successfully:", encounters[encounterIndex]);
    return encounters[encounterIndex];
  } else {
    console.error("Encounter not found with ID:", updatedData.EncounterID);
    throw new Error("Encounter not found.");
  }
};

/**
 * Fetch encounter details by PatientID
 */
export const getEncounterByPatientIDFromDB = async (patientID) => {
  return encounters.find((encounter) => encounter.PatientID === patientID) || null;
};

