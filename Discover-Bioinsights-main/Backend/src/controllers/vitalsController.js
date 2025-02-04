// src/controllers/vitalsController.js

import { createVitalsEncounter as saveVitals } from "../tables/patientVitalsEncounter.js";


// Create a new vitals encounter
export const createVitalsEncounter = async (req, res) => {
  const vitalsData = req.body;
  try {
    const savedVitals = await saveVitals(vitalsData);
    res.status(201).json({
      message: "Vitals encounter created successfully",
      vitals: saveVitals,
    });
  } catch (error) {
    console.error("Error creating vitals encounter:", error);
    res.status(400).json({ message: "Failed to create vitals record: " + error.message });
  }
};

// Update vitals using VitalsCaptureID
export const updateVitals = async (rqe,res) => {
  const vitalsData = req.body;
  try {
    if (!vitalsData.VitalsCaptureID) {
      return res.status(400).json({ message: "VitalsCaptureID is required for updating vitals." });
    }
    // Update the vitals data in the mock database
    const updatedVitals = await updateVitalsInDB(vitalsData);

    if (updatedVitals) {
      res.status(200).json({ message: "Vitals record updated successfully.", vitals: updatedVitals });
    } else {
      res.status(404).json({ message: "Vitals record not found." });
    }
  } catch (error) {
    console.error("Error updating vitals record:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all vitals records by PatientID
export const getVitalsByPatientID = async (req, res) => {
  const patientID = req.body;
  try {
    const vitalsRecords = getVitalsByPatientID(patientID);
    
   
    if (vitalsRecords.length === 0) {
      res.status(200).json({ message: 'No Vitals records found for this patientID', data: vitalsRecords });
    }

    else{
      res.status(200).json({ message: 'Vitals records', data: vitalsRecords });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
