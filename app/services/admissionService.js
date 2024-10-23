import { ENDPOINTS } from "../utils/apiConfig";

// services/admissionService.js
export const createAdmission = async (admissionData) => {
    try {
      const response = await fetch(
        ENDPOINTS.createAdmission,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ admission: admissionData }),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error al enviar la admisión:', error);
      throw error;
    }
  };
  export const getAllAdmissions = async () => {
    try {
      const response = await fetch(ENDPOINTS.getAdmission);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error al obtener las admisiones:', error);
      throw error;
    }
  };
  export const updateAdmission = async (id, updatedData) => {
    try {
      const response = await fetch(ENDPOINTS.updateAdmision(id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ admission: updatedData }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error al actualizar la admisión:', error);
      throw error;
    }
  };