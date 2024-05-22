import { createStore } from 'redux';
import languageReducer from './reducer';

const store = createStore(languageReducer);

export default store;
