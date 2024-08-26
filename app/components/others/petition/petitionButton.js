// src/components/PeticionCard.js
import React from 'react';

const PeticionCard = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Peticiones</h2>
        <a 
          href="mailto:example@example.com?subject=Crear%20Petición" 
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full text-center hover:bg-blue-700 transition duration-300"
        >
          Crear petición
        </a>
      </div>
    </div>
  );
};

export default PeticionCard;
