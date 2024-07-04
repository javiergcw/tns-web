// services/userService.js
import axios from 'axios';
import { ENDPOINTS, BEARER_TOKEN } from '@/app/utils/apiConfig';
import Profile from '../models/profile/profileModel';

// Obtener los headers de autorización
const getAuthHeaders = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${BEARER_TOKEN}`
    }
  };
};

// Obtener el perfil del usuario logueado
export const getUserProfile = async () => {
  // Recuperar el ID del usuario desde localStorage
  let userId = localStorage.getItem("userId");

  // Si no hay userId en localStorage, lo establecemos con un valor quemado (solo para desarrollo)
  if (!userId) {
    userId = '123'; // Valor quemado para pruebas
    localStorage.setItem('userId', userId);
    console.log('User ID was missing, setting default:', userId); // Para depuración
  } else {
    console.log('User ID from localStorage:', userId); // Para depuración
  }

  try {
    // Hacer la solicitud para obtener el perfil del usuario
    const url = ENDPOINTS.getProfileById(userId);
    console.log('Requesting profile with URL:', url); // Para depuración

    const response = await axios.get(url, getAuthHeaders());
    console.log('Profile response:', response.data); // Para depuración

    // Crear una instancia de Profile con los datos de la respuesta
    return new Profile(response.data.profile);
  } catch (error) {
    console.error('Failed to fetch user profile:', error.response ? error.response.data : error.message);
    throw error;
  }
};
