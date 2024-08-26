import { get, post, patch } from "./apiRequest";
import { ENDPOINTS } from "@/app/utils/apiConfig";
import AccountTypeModel from "../models/accountType/accountTypeModel";

// Servicio para obtener todos los tipos de cuenta
const getAllAccountTypes = async () => {
    try {
        const response = await get(ENDPOINTS.getAllAccountTypes);
        console.log('Respuesta del servidor:', response);  // Depuración

        if (!Array.isArray(response)) {
            throw new Error('Formato de respuesta inválido');
        }

        return response.map(accountType => new AccountTypeModel(accountType));
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Servicio para crear un nuevo tipo de cuenta
const createAccountType = async (accountTypeData) => {
    try {
        const response = await post(ENDPOINTS.createAccountType, { account_type: accountTypeData });
        console.log('Respuesta del servidor en createAccountType:', response);  // Depuración
        return new AccountTypeModel(response);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Servicio para actualizar un tipo de cuenta existente
const updateAccountType = async (id, accountTypeData) => {
    try {
        const response = await patch(ENDPOINTS.updateAccountType(id), { account_type: accountTypeData });
        console.log('Respuesta del servidor en updateAccountType:', response);  // Depuración
        return new AccountTypeModel(response);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Servicio para eliminar un tipo de cuenta
const deleteAccountType = async (id) => {
    try {
        const response = await post(ENDPOINTS.deleteAccountType, { id });
        console.log('Respuesta del servidor en deleteAccountType:', response);  // Depuración
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export { getAllAccountTypes, createAccountType, updateAccountType, deleteAccountType };
