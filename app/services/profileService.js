// src/services/profileService.js
import { BEARER_TOKEN, ENDPOINTS } from '../config/apiConfig';
import Profile from '../models/Profile';

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

export { updateProfile };
