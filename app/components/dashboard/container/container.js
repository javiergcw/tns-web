import React from 'react';

/**
 * Container Component
 *
 * Este componente ajusta su margen izquierdo según el estado del drawer y permite un scroll vertical.
 * Debe ser usado siempre que exista el drawer.
 *
 * @param {boolean} isDrawerOpen - Estado de si el drawer está abierto.
 * @param {React.ReactNode} children - Los componentes hijos que se renderizarán dentro del contenedor.
 *
 * @component
 */
const Container = ({ isDrawerOpen, children }) => {
  return (
    <div className={`flex-1 transition-all duration-300 ease-in-out px-8 bg-bgPrimary ${isDrawerOpen ? 'ml-64' : 'ml-16'} h-full max-h-screen overflow-y-auto`}>
      {children}
    </div>
  );
};

export default Container;