// src/services/profileService.js
import { ENDPOINTS, BEARER_TOKEN } from '@/app/utils/apiConfig';
import Profile from '../models/profile/profileModel';

const updateProfile = async (id, profileData) => {
  try {
    const response = await fetch(ENDPOINTS.updateProfile(id), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BEARER_TOKEN}`
      },
      body: JSON.stringify({ profile: profileData })
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el perfil');
    }

    const data = await response.json();
    return new Profile(data.profile);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const getAllProfiles = async () => {
  try {
    const response = await fetch(ENDPOINTS.getAllProfiles, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BEARER_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener los perfiles');
    }

    const data = await response.json();
    console.log('Respuesta del servidor:', data);  // Añade esta línea para depuración
    if (!data || !Array.isArray(data.profiles)) {
      throw new Error('Formato de respuesta inválido');
    }

    return data.profiles.map(profile => new Profile(profile));
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const getProfileById = async (id) => {
  try {
    const response = await fetch(ENDPOINTS.getProfileById(id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BEARER_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener el perfil');
    }

    const data = await response.json();
    return new Profile(data.profile);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export { updateProfile, getAllProfiles, getProfileById };
