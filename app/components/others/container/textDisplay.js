import React from "react";
/**
 * TextDisplay Component
 *
 * Este componente genera un contenedor de texto con un label personalizable.
 *
 * @param {string} labelText - El texto que se mostrará en el label del contenedor.
 * @param {string} labelColor - El color del texto del label ("blue", "green", "grey").
 * @param {string} displaySize - El tamaño del contenedor ("small", "medium", "large").
 * @param {string} value - El valor del texto a mostrar.
 *
 **/
const TextDisplay = ({
  labelText = "Label",
  labelColor = "blue",
  displaySize = "medium",
  value = "",
}) => {
  // Función para obtener el tamaño del contenedor
  const getDisplaySizeClass = () => {
    switch (displaySize) {
      case "small":
        return "w-1/3 text-sm";
      case "medium":
        return "w-1/2 text-base";
      case "large":
        return "w-full text-lg";
      default:
        return "w-full text-base";
    }
  };

  // Función para obtener el color del label
  const getLabelColorClass = () => {
    switch (labelColor) {
      case "blue":
        return "text-sky-500";
      case "green":
        return "text-lime-500";
      case "grey":
        return "text-gray-500";
      default:
        return "text-slate-950";
    }
  };

  return (
    <div className="flex flex-col items-start">
      <label className={`mb-1 text-sm font-medium ${getLabelColorClass()} `}>
        {labelText}
      </label>
      <div
        className={`block mb-5 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-white ${getDisplaySizeClass()} `}
      >
        {value}
      </div>
    </div>
  );
};

export default TextDisplay;
