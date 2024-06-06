// store/BlocContext.js
import React, { createContext, useReducer, useContext } from 'react';

// Crea un contexto
const BlocContext = createContext();

// Crea un reducer para manejar las acciones
const blocReducer = (state, action) => {
  switch (action.type) {
    case 'ACTION_TYPE':
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

// Proveedor del contexto
export const BlocProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blocReducer, { data: null });

  return (
    <BlocContext.Provider value={{ state, dispatch }}>
      {children}
    </BlocContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useBloc = () => useContext(BlocContext);
