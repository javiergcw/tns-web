import { get, patch } from "./apiRequest";
import { ENDPOINTS } from "@/app/utils/apiConfig";
import Profile from '../models/profile/profileModel';

const getAllProfiles = async () => {
  try {
    const response = await get(ENDPOINTS.getAllProfiles);
    console.log('Respuesta del servidor:', response);

    if (!Array.isArray(response)) {
      throw new Error('Formato de respuesta inválido');
    }

    return response.map(profile => new Profile({
      ...profile,
      total_earned: profile.total_earned || 0, // Aseguramos que total_earned esté presente
    }));
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const getProfileById = async (id) => {
  try {
    const response = await get(ENDPOINTS.getProfileById(id));
    console.log('Respuesta del servidor en getProfileById:', response);
    return new Profile({
      ...response,
      total_earned: response.total_earned || 0, // Aseguramos que total_earned esté presente
    });
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const updateProfile = async (id, profileData) => {
  try {
    const response = await patch(ENDPOINTS.updateProfile(id), { profile: profileData });
    console.log('Respuesta del servidor en updateProfile:', response);
    return new Profile({
      ...response.profile,
      total_earned: response.profile.total_earned || 0, // Aseguramos que total_earned esté presente
    });
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export { updateProfile, getAllProfiles, getProfileById };