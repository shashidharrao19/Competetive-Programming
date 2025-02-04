// backend/controllers/encounterController.js
import { saveEncounter, updateEncounterByPatientID, getEncounterByPatientIDFromDB } from "../tables/encounterTable.js";

import { updateVitalsInDB } from "../tables/patientVitalsEncounter.js";

export const createPatientEncounter = async (req, res) => {
  try {
    const encounterData = req.body;

    if (!encounterData.PatientID) {
      return res.status(400).json({ message: "Patient ID is required" });
    }

    const savedEncounter = await saveEncounter(encounterData);
    res.status(201).json(savedEncounter);
  } catch (error) {
    console.error("Error in createPatientEncounter:", error);
    res.status(500).json({ message: "Failed to save patient encounter" });
  }
};

export const updateEncounter = async (req, res) => {
  try {
    const updatedData = req.body;

    // Validate request body
    if (!updatedData.PatientID) {
      return res.status(400).json({
        message: "PatientID is required to update the encounter",
      });
    }

    const updatedEncounter = await updateEncounterByPatientID(updatedData);
    return res.status(200).json({
      message: "Encounter updated successfully",
      data: updatedEncounter,
    });
  } catch (error) {
    console.error("Error updating encounter:", error);
    return res.status(500).json({
      message: "Failed to update encounter",
      error: error.message,
    });
  }
};

/**
 * Controller to fetch encounter details by PatientID from the encounter table
 */
export const getEncounterByPatientID = async (req, res) => {
  try {
    const { patientID } = req.params;

    if (!patientID) {
      return res.status(400).json({
        message: "PatientID is required",
      });
    }

    const encounter = await getEncounterByPatientIDFromDB(patientID);

    if (!encounter) {
      return res.status(404).json({
        message: "Encounter not found for the given PatientID",
      });
    }

    return res.status(200).json({
      message: "Encounter details retrieved successfully",
      data: encounter,
    });
  } catch (error) {
    console.error("Error fetching encounter:", error);
    return res.status(500).json({
      message: "Failed to fetch encounter details",
      error: error.message,
    });
  }
};

export const updateEncounterAndVitals = async (req, res) => {
  const formData  = req.body;
  const encounterData = {
    patientID: formData.patientID,
    modeOfArrival: formData.modeOfArrival,
    returnWithin72Hours: formData.returnWithin72Hours,
    lastDischargeDate: formData.lastDischargeDate,
    chiefComplaintID: formData.chiefComplaint,
    informedBy: formData.informedBy,
    knownAllergies: formData.knownAllergies,
    bedNumber: formData.bedNumber,
    vitalsCaptureID: `VC${Date.now()}`,
  };

  const vitalsData = {
    vitalsCaptureID: `VC${Date.now()}`,
    patientEncounterID: formData.patientID,
    patientID: formData.patientId,
    checkinDate: new Date().toISOString().split("T")[0],
    checkinTime: new Date().toISOString().split("T")[1].split(".")[0],
    temperature: formData.temperature,
    pulseRate: formData.heartRate,
    respRate: formData.respiratoryRate,
    systolicBP: formData.systolicBP,
    diastolicBP: formData.diastolicBP,
    GRBS: formData.grbs,
    painScore: formData.painScore,
    GCS_EVM: formData.glasgowComaScale,
    triageOutcome: formData.mewsScore,
  };

  try {
    // Update encounter table
    console.log("Before");
    const updatedEncounter = await updateEncounterByPatientID(encounterData);
    console.log("After");
    console.log("Encounter updated successfully:", updatedEncounter);

    // Update vitals table
    const updatedVitals = await updateVitalsInDB(vitalsData);
    console.log("Vitals updated successfully:", updatedVitals);

    res.status(200).json({ updatedEncounter, updatedVitals });
  } catch (error) {
    console.error("Error updating encounter and vitals:", error);
    res.status(500).json({ error: "Failed to update encounter and vitals." });
  }
};

