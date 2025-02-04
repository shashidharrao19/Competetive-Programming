

export const fetchPatients = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/patients`); // Adjust the endpoint as per your backend
      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching patients:", error);
      throw error;
    }
  };


  
// register a new patient

export const registerPatient = async (patientData) => {
  try {
    const response = await fetch('http://localhost:5000/api/patients/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to register patient');
    }

    return await response.json(); // Return the saved patient details
  } catch (error) {
    console.error('Error in registerPatient API:', error);
    throw error; // Re-throw to be caught in the calling component
  }
};


// api/patientEncounterApi

export const createPatientEncounter = async (encounterData) => {
  try {
    const response = await fetch('http://localhost:5000/api/encounter/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(encounterData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create patient encounter');
    }

    return await response.json(); // Return the saved encounter details
  } catch (error) {
    console.error('Error in createPatientEncounter API:', error);
    throw error;
  }
};

// Function to search for patients
export const searchPatient = async (searchType, searchValue) => {
  try {
    const response = await fetch(`http://localhost:5000/api/patients/search?searchType=${searchType}&searchValue=${searchValue}`);
    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in searchPatient API call:', error);
    throw error;
  }
};

// Update Patient Details

export const updatePatientDetails = async (patientDetails) => {
  try {
    console.log('Updating Patient Details', patientDetails);
    const response = await fetch(`http://localhost:5000/api/patients/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patientDetails),
    });

    if (!response.ok) {
      throw new Error('Failed to update patient details');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in updatePatientDetails API call:', error);
    throw error;
  }
};

