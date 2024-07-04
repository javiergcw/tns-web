// config/apiConfig.js
const API_BASE_URL = 'https://peaceful-basin-91811-0bab38de372b.herokuapp.com/api/v1';
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM0LCJqdGkiOiI2NzZhZTc4ZC04MDEyLTRmYTItOTljYi0zODM1NjUwNzFiNjMiLCJleHAiOjE3MjAxMTg5OTl9.EIHSzokYlkKmiRxToxjHKn3JcC2UYRmzaloLPTMeMzY';

const ENDPOINTS = {
    login: `${API_BASE_URL}/login`,
    register: `${API_BASE_URL}/users`,
    home: `${API_BASE_URL}/home`,
    perfil: `${API_BASE_URL}/profile`,
    categories: `${API_BASE_URL}/categories`,
    getProfileById: (id) => `${API_BASE_URL}/profiles/${id}`,
    
    deleteCategory: `${API_BASE_URL}/categories/delete`,
    




    //getUsers: `${API_BASE_URL}/users`,
    getPosts: `${API_BASE_URL}/posts`,
    // Agrega más endpoints según sea necesario
};

export { API_BASE_URL, BEARER_TOKEN, ENDPOINTS };
