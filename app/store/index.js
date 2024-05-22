import { createStore } from 'redux';
import languageReducer from './reducer';

// Crear el store
const store = createStore(languageReducer);

export default store;
