import { TOGGLE_LANGUAGE } from './actions';

// Estado inicial con fallback a localStorage
const initialState = {
  isEnglish: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('isEnglish')) ?? true : true,
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LANGUAGE:
      const newState = {
        ...state,
        isEnglish: !state.isEnglish,
      };
      if (typeof window !== 'undefined') {
        // Guardar el nuevo estado en localStorage
        localStorage.setItem('isEnglish', JSON.stringify(newState.isEnglish));
      }
      return newState;
    default: 
      return state;
  }
};

export default languageReducer;
