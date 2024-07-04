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
      return new Profile(data.profile);  // Asumiendo que el perfil actualizado está en data.profile
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  const getAllProfiles = async () => {
    try {
      const response = await fetch(`${ENDPOINTS.profiles}`, {
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
      return data.profiles.map(profile => new Profile(profile));
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  
  export { updateProfile, getAllProfiles };
  
