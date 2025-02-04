export const updateEncounterAndVitals = async (formData) => {
    
    try {
      // Update Encounter Table
      const response = await fetch(`http://localhost:5000/api/encounter/vitals/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update Encounter Table");
      }

      // Return both encounter and vitals update results
      return await response.json();
    } catch (error) {
      console.error("Error in updateEncounterAndVitals:", error);
      throw error;
    }
  };
  