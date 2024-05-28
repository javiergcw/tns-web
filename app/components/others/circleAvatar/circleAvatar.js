import React from 'react';

/**
 * CircleAvatar Component
 *
 * Este componente renderiza una imagen circular con un borde de color personalizado y de tamaño ajustable.
 *
 * @param {string} imageUrl - La URL de la imagen a mostrar.
 * @param {string} borderColor - El color del borde (opciones: "blue", "grey", "green", "white", "black").
 * @param {string} size - El tamaño del avatar (opciones: "big", "normal", "small").
 *
 * @component
 */
const CircleAvatar = ({ imageUrl, borderColor = "black", size = "normal" }) => {
  // Función para obtener la clase de color del borde
  const getBorderColorClass = () => {
    switch (borderColor) {
      case "blue":
        return "border-blue-500";
      case "grey":
        return "border-gray-500";
      case "green":
        return "border-green-500";
      case "white":
        return "border-white";
      case "black":
        return "border-black";
      default:
        return "border-black";
    }
  };

  // Función para obtener la clase de tamaño del avatar
  const getSizeClass = () => {
    switch (size) {
      case "big":
        return "w-24 h-24";
      case "normal":
        return "w-16 h-16";
      case "small":
        return "w-10 h-10";
      default:
        return "w-16 h-16";
    }
  };

  return (
    <div className={`rounded-full border-2 overflow-hidden ${getBorderColorClass()} ${getSizeClass()}`}>
      <img src={imageUrl} alt="Avatar" className="object-cover w-full h-full" />
    </div>
  );
};

export default CircleAvatar;
