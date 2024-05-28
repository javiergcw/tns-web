import React from 'react';

/**
 * Checkbox Component
 *
 * Este componente renderiza un checkbox con texto y color personalizado.
 *
 * @param {string} labelText - El texto del checkbox.
 * @param {string} color - El color del texto (opciones: "blue", "grey", "green", "white", "black").
 *
 * @component
 */
const Checkbox = ({ labelText, color = "black" }) => {
  // Función para obtener la clase de color del texto
  const getColorClass = () => {
    switch (color) {
      case "blue":
        return "text-blue-500";
      case "grey":
        return "text-gray-500";
      case "green":
        return "text-green-500";
      case "white":
        return "text-white";
      case "black":
        return "text-black";
      default:
        return "text-black";
    }
  };

  return (
    <label className={`inline-flex items-center ${getColorClass()}`}>
      <input type="checkbox" className="form-checkbox" />
      <span className="ml-2">{labelText}</span>
    </label>
  );
};

export default Checkbox;