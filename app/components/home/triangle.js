import React from 'react';

// Componente de figuras responsivas
const ResponsiveTriangles = () => {
  // Tamaños base para escritorio
  let baseSize = 30; // Tamaño base para los triángulos pequeños
  let middleSize = 45; // Tamaño para el triángulo del medio
  let baseBorderSize = 30; // Tamaño del borde base para los triángulos pequeños
  let middleBorderSize = 40; // Tamaño del borde para el triángulo del medio

  // Ajuste para tabletas
  if (window.innerWidth <= 768) {
    baseSize = 20; // Reducir tamaño para tabletas
    middleSize = 30;
    baseBorderSize = 20;
    middleBorderSize = 25;
  }

  // Ajuste para móviles
  if (window.innerWidth <= 480) {
    baseSize = 15; // Reducir tamaño para móviles
    middleSize = 22;
    baseBorderSize = 15;
    middleBorderSize = 18;
  }

  return (
    <div className="flex justify-center">
      <div className="flex justify-center items-end">
        <div style={{ width: 0, height: 0, borderBottom: `${baseSize}px solid #004F9F`, borderLeft: `${baseBorderSize}px solid transparent`, borderRight: `${baseBorderSize}px solid transparent` }}></div>
        <div style={{ width: 0, height: 0, borderBottom: `${middleSize}px solid #004F9F`, borderLeft: `${middleBorderSize}px solid transparent`, borderRight: `${middleBorderSize}px solid transparent`, margin: '0 1px' }}></div>
        <div style={{ width: 0, height: 0, borderBottom: `${baseSize}px solid #004F9F`, borderLeft: `${baseBorderSize}px solid transparent`, borderRight: `${baseBorderSize}px solid transparent` }}></div>
      </div>
    </div>
  );
};

export default ResponsiveTriangles;
