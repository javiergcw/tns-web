// services/getBugs.js
import { get, post } from "./apiRequest";
import Bug from '../models/bugs/bugModel';
import { ENDPOINTS } from '../utils/apiConfig';

export const getAllBugs = async () => {
  try {
    const response = await get(ENDPOINTS.bugs);
    console.log('Respuesta del servidor:', response); // Añade esta línea para depuración

    if (!Array.isArray(response)) {
      throw new Error('Formato de respuesta inválido');
    }

    return response.map(bug => new Bug(bug));
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Nueva función para crear un bug
export const createBug = async (bugData) => {
  try {
    const response = await post(ENDPOINTS.create_bug, bugData);
    console.log('Respuesta del servidor:', response); // Añade esta línea para depuración

    if (!response || typeof response !== 'object') {
      throw new Error('Formato de respuesta inválido');
    }

    return new Bug(response);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
