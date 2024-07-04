// app/store/userIdReducer.js
import { SET_USER_ID, CLEAR_USER_ID } from './actions';

// Estado inicial con fallback a localStorage
const initialState = {
  userId: typeof window !== 'undefined' ? localStorage.getItem('userId') ?? null : null,
};

const userIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ID:
      const newState = {
        ...state,
        userId: action.payload,
      };
      if (typeof window !== 'undefined') {
        // Guardar el nuevo estado en localStorage
        localStorage.setItem('userId', newState.userId);
      }
      return newState;
    case CLEAR_USER_ID:
      if (typeof window !== 'undefined') {
        // Eliminar el estado de localStorage
        localStorage.removeItem('userId');
      }
      return {
        ...state,
        userId: null,
      };
    default:
      return state;
  }
};

export default userIdReducer;
