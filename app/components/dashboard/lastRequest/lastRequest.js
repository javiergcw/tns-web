import React from 'react';
import Text from '@/app/components/others/text/text';

/**
 * LastRequests Component
 *
 * Este componente muestra información sobre un área, su líder y una descripción.
 * Es un componente donde el administrador puede ver las últimas peticiones que hacen los jefes de área.
 *
 * @param {string} area - El título que representa el área.
 * @param {string} leader - El subtítulo que representa el nombre del líder.
 * @param {string} description - La descripción del área o solicitud.
 *
 * @component
 */
const LastRequests = ({ area, leader, description }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto border border-gray-200">
      <div className="flex items-center mb-4">
        <Text texto={area} color="blue" type="title" className="mr-2" />
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
      <Text texto={leader} color="green" type="subtitle" className="mb-2" />
      <Text texto="Description:" color="blue" type="normal" className="font-semibold mb-1" />
      <Text texto={description} color="grey" type="normal" className="text-gray-600" />
    </div>
  );
};

export default LastRequests;
