// Archivo: services/messageService.js

import { get, post, patch } from "./apiRequest";
import { ENDPOINTS } from "@/app/utils/apiConfig";
import MessageDTO from "../models/messages/messageModel";

// Servicio para obtener todos los mensajes
const getAllMessages = async () => {
    try {
        const response = await get(ENDPOINTS.getAllMessages);
        console.log('Respuesta del servidor en getAllMessages:', response);  // Depuración

        if (!Array.isArray(response)) {
            throw new Error('Formato de respuesta inválido');
        }

        return response.map(message => new MessageDTO(
            message.id,
            message.body,
            message.user.id,
            message.user.profile?.name || "Usuario Desconocido",
            message.user.email || "Correo no disponible",
            message.shopping_id,
            message.created_at,
            message.updated_at
        ));
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Servicio para crear un nuevo mensaje
const createMessage = async (messageData) => {
    try {
        const response = await post(ENDPOINTS.createMessage, messageData);
        console.log('Respuesta del servidor en createMessage:', response);  // Depuración

        if (!response.id) {
            // Si el ID no se genera correctamente, lanza un error
            throw new Error('El ID del mensaje no fue generado correctamente.');
        }

        // Retornar un nuevo objeto MessageDTO basado en la respuesta
        return new MessageDTO(
            response.id,
            response.body,
            response.user_id, // Cambiado para que coincida con la estructura de la respuesta
            "Usuario Desconocido", // Ajustado ya que no se devuelve el perfil en la respuesta
            "Correo no disponible", // Ajustado ya que no se devuelve el email en la respuesta
            response.shopping_id,
            response.created_at,
            response.updated_at
        );
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


// Servicio para actualizar un mensaje existente
const updateMessage = async (id, messageData) => {
    try {
        const response = await patch(ENDPOINTS.updateMessage(id), messageData);
        console.log('Respuesta del servidor en updateMessage:', response);  // Depuración
        return new MessageDTO(
            response.id,
            response.body,
            response.user.id,
            response.user.profile?.name || "Usuario Desconocido",
            response.user.email || "Correo no disponible",
            response.shopping_id,
            response.created_at,
            response.updated_at
        );
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Servicio para eliminar un mensaje
// Servicio para eliminar un mensaje
const deleteMessage = async (id) => {
    try {
        const response = await post(ENDPOINTS.deleteMessage, { id });
        console.log('Respuesta del servidor en deleteMessage:', response);  // Depuración

        // Validar la respuesta
        if (response.message !== 'El mensaje ha sido eliminado exitosamente.') {
            throw new Error('Error al eliminar el mensaje. Por favor, intenta nuevamente.');
        }

        return response.message;  // Devuelve el mensaje de confirmación
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Servicio para obtener mensajes por shoppingId
const getMessagesByShoppingId = async (shoppingId) => {
    try {
        const response = await get(ENDPOINTS.getMessagesByShoppingId(shoppingId));
        console.log('Respuesta del servidor en getMessagesByShoppingId:', response);  // Depuración

        if (!Array.isArray(response)) {
            throw new Error('Formato de respuesta inválido');
        }

        return response.map(message => new MessageDTO(
            message.id,
            message.body,
            message.user.id,
            message.user.profile?.name || "Usuario Desconocido",
            message.user.email || "Correo no disponible",
            message.shopping_id,
            message.created_at,
            message.updated_at
        ));
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export { getAllMessages, createMessage, updateMessage, deleteMessage, getMessagesByShoppingId };
