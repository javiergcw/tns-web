import React from "react";

//Parametros necesarios par el uso general del botón.

const NormalButton = ({
  color = "blue",
  size = "medium",
  text = "LOGIN",
  redirectUrl,
}) => {
  const handleClick = () => {
    if (redirectUrl) {
      window.open(redirectUrl, "_blank");
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
      className={`flex items-center px-3 py-2 border border-gray-300 rounded-lg overflow-hidden focus:outline-none group transition-colors duration-300 ease-in-out mt-5 ${getColorClass()} ${getSizeClass()}`}
    >
      <span className="flex-1">{text}</span>
    </button>
  );
};

export default NormalButton;
