import React from "react";
import Text from "@/app/components/others/text/text";

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
    <div className="p-6 bg-white shadow-md rounded-md max-w-md mx-auto h-64 w-1/3">
      <Text
        texto={area}
        color="blue-secondary"
        type="title"
        className="text-left mb-1"
      />
      <hr className="border-black my-1" />
      <Text
        texto={leader}
        color="green"
        type="subtitle"
        className="text-left mb-1 font-bold"
      />
      <Text
        texto="description:"
        color="blue-secondary"
        type="normal"
        className="text-left mt-1 font-bold"
      />
      <Text
        texto={description}
        color="grey"
        type="normal"
        className="text-left mt-1"
      />
    </div>
  );
};

export default LastRequests;
