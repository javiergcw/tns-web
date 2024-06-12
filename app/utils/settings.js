//Constantes de input requerido
// app/utils/settings.js

// Constante numérica
export const limitInputDigit = 3;
export const errorMessages = {
    required: field => `${field} es requerido`,
    minLength: (field, length) => `${field} debe tener al menos ${length} caracteres`,
    email: field => `${field} debe ser válido`,
};

// Puedes agregar más constantes aquí...
