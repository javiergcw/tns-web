import { get, post, patch } from "./apiRequest";
import { ENDPOINTS } from "@/app/utils/apiConfig";
import AreaModel from "../models/areas/areaModel";

// Servicio para obtener todas las áreas
const getAllAreas = async () => {
    try {
        const response = await get(ENDPOINTS.getAllAreas);
        console.log('Respuesta del servidor:', response);  // Depuración

        if (!Array.isArray(response)) {
            throw new Error('Formato de respuesta inválido');
        }

        return response.map(area => new AreaModel(area));
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Servicio para crear una nueva área
const createArea = async (areaData) => {
    try {
        const response = await post(ENDPOINTS.createArea, { area: areaData });
        console.log('Respuesta del servidor en createArea:', response);  // Depuración
        return new AreaModel(response); // Ajustado para usar directamente la respuesta
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Servicio para actualizar un área existente
const updateArea = async (id, areaData) => {
    try {
        const response = await patch(ENDPOINTS.updateArea(id), { area: areaData });
        console.log('Respuesta del servidor en updateArea:', response);  // Depuración
        return new AreaModel(response); // Ajustado para usar directamente la respuesta
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Servicio para eliminar un área
const deleteArea = async (id) => {
    try {
        const response = await post(ENDPOINTS.deleteArea, { id });
        console.log('Respuesta del servidor en deleteArea:', response);  // Depuración
        return response;  // Ajusta según la estructura real de tu respuesta
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export { getAllAreas, createArea, updateArea, deleteArea };
