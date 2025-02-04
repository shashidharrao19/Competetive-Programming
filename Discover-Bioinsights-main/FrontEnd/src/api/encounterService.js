import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

/**
 * Fetch encounter details by PatientID
 * @param {string} patientID - The PatientID to search for
 * @returns {Promise<Object>} Encounter details if found, else an error message
 */
export const getEncounterByPatientID = async (patientID) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/encounter/${patientID}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching encounter by PatientID:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch encounter details"
    );
  }
};

/**
 * Create a new patient encounter
 * @param {Object} encounterData - The encounter data to be saved
 * @returns {Promise<Object>} The newly created encounter record
 */
export const createEncounter = async (encounterData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/encounter/create`, encounterData);
    return response.data;
  } catch (error) {
    console.error("Error creating encounter:", error);
    throw new Error(
      error.response?.data?.message || "Failed to create encounter"
    );
  }
};

/**
 * Update an existing encounter by PatientID
 * @param {Object} updatedData - The updated encounter data
 * @returns {Promise<Object>} The updated encounter record
 */
export const updateEncounter = async (updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/encounter/update`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating encounter:", error);
    throw new Error(
      error.response?.data?.message || "Failed to update encounter"
    );
  }
};
