import { get, patch } from "./apiRequest";
import { ENDPOINTS } from "@/app/utils/apiConfig";
import Profile from '../models/profile/profileModel';

const getAllProfiles = async () => {
  try {
    const response = await get(ENDPOINTS.getAllProfiles);
    console.log('Respuesta del servidor:', response);  // Añade esta línea para depuración

    if (!Array.isArray(response)) {
      throw new Error('Formato de respuesta inválido');
    }

    return response.map(profile => new Profile(profile));
  } catch (error) {
    console.error('Error al obtener todos los perfiles:', error);
    throw error;
  }
};

const getProfileById = async (id) => {
  try {
    const response = ENDPOINTS.getProfileById(id);
    console.log('Respuesta del servidor en getProfileById:', response);
    console.log("----------------------------------------------------------------------");
    console.log(response);
    console.log("----------------------------------------------------------------------");
    return new Profile(response);
  } catch (error) {
    console.error(`Error al obtener el perfil con id ${id}:`, error);
    throw error;
  }
};
const updateProfile = async (id, profileData) => {
  try {
    const response = await patch(ENDPOINTS.updateProfile(id), { profile: profileData });
    console.log('Respuesta del servidor en updateProfile:', response);  // Añade esta línea para depuración

    return new Profile(response.profile);
  } catch (error) {
    console.error(`Error al actualizar el perfil con id ${id}:`, error);
    throw error;
  }
};

export { updateProfile, getAllProfiles, getProfileById };
