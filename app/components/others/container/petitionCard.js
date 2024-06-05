// PeticionCard.js

import React from 'react';

const PeticionCard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-10 text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">Peticiones</h2>
        <button className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-600 text-lg">
          Crear petición
        </button>
      </div>
    </div>
  );
};

export default PeticionCard;

