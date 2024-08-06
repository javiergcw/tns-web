import React from "react";

/**
 * NormalButton Component
 *
 * Este componente genera un botón personalizable que puede tener diferentes colores, tamaños y textos.
 * También puede redirigir a una URL cuando se hace clic en él.
 *
 * @param {string} color - El color del botón ("blue", "green", "red").
 * @param {string} size - El tamaño del botón ("small", "medium", "large").
 * @param {string} text - El texto que se mostrará en el botón.
 * @param {string} redirectUrl - La URL a la que redirige el botón al hacer clic.
 * @param {string} additionalClasses - Clases CSS adicionales para personalizar el botón.
 * @param {function} onClick - Función que se ejecuta al hacer clic en el botón.
 **/

const NormalButton = ({
  color = "blue",
  size = "medium",
  text = "LOGIN",
  redirectUrl,
  additionalClasses = "",
  onClick, // Agregado para aceptar la función onClick
}) => {
  const handleClick = () => {
    if (redirectUrl) {
      window.open(redirectUrl, "_blank");
    } else if (onClick) {
      onClick(); // Ejecuta la función onClick pasada como prop
    }
  };

  // Función para obtener el tamaño del botón
  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "w-1/4";
      case "medium":
        return "w-1/2";
      case "large":
        return "w-full";
      default:
        return "w-1/2";
    }
  };

  // Función para obtener el color del botón
  const getColorClass = () => {
    switch (color) {
      case "blueButton":
        return "bg-blueButton hover:bg-blueLight";
      case "redPrimary":
        return "bg-redPrimary";
      case "blue":
        return "bg-blue-500 hover:bg-blue-600";
      case "green":
        return "bg-green-500 hover:bg-green-600";
      case "red":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center px-3 py-2 border border-gray-300 rounded-lg overflow-hidden focus:outline-none group transition-colors duration-300 ease-in-out mt-5 ${getColorClass()} ${getSizeClass()} ${additionalClasses}`}
    >
      <span className="flex-1 text-white">{text}</span>
    </button>
  );
};

export default NormalButton;
