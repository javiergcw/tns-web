// services/apiService.js
import axios from 'axios';
import {ENDPOINTS} from '../utils/apiConfig';

// Función global para hacer solicitudes HTTP
const apiRequest = async (method, url, data = null, params = null, authRequired = true) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
  
      if (authRequired) {
        const token = localStorage.getItem('token');
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      }
  
      console.log('Making request to:', url); // Para depuración
      console.log('Request data:', data); // Para depuración
  
      const response = await axios({
        method,
        url,
        data,
        params,
        headers,
      });
      console.log(params);
  
      if (response.status < 300) {
        console.log('Response data:', response.data); // Para depuración
        return response.data;
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(`API request errorS: ${error}`);
      throw error;
    }
  };
  
  // Función para el login
  export const register = async (email, password, passwordConfirmation, name) => {
    const user = { user: { email, password, password_confirmation: passwordConfirmation, name } };
    try {
      const response = await axios.post(ENDPOINTS.register, user, { headers: { 'Content-Type': 'application/json' } });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw new Error('Registration failed');
    }
  };
  
  export const login = async (email, password) => {
    const user = { user: { email, password } };
    try {
      const response = await axios.post(ENDPOINTS.login, user, { headers: { 'Content-Type': 'application/json' } });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  
  
  // Funciones para cada tipo de solicitud HTTP
  export const get = (url, params) => apiRequest('get', url, null, params);
  export const post = (url, data, authRequired = true) => apiRequest('post', url, data, null, authRequired);
  export const del = (url, data) => apiRequest('delete', url, data);
  export const patch = (url, data) => apiRequest('patch', url, data);