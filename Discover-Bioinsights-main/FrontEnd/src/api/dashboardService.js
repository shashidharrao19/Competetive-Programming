export const fetchCurrentStatus = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/dashboard/currentstatus`); 
      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching patients:", error);
      throw error;
    }
  };

export const fetchMetrics = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/dashboard/metrics`); 
      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching patients:", error);
      throw error;
    }
  };

export const fetchStaffDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/dashboard/staff`); 
      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching patients:", error);
      throw error;
    }
  };