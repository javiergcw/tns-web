"use client";
import colors from "@/app/styles/colors";
import React from "react";

/**
 * Text Component
 *
 * Este componente renderiza texto con diferentes colores y estilos.
 *
 * @param {string} texto - El contenido de texto a mostrar.
 * @param {string} color - El color del texto (opciones: "blue", "grey", "green", "white", "black").
 * @param {string} type - El tipo de texto (opciones: "title", "subtitle", "normal", "header").
 *
 * @component
 */
const Text = ({ texto, color = "black", type = "normal" }) => {
  // Función para obtener la clase CSS correspondiente al color del texto
  const getColorClass = () => {
    switch (color) {
      case "gray6th":
        return "text-gray6th";
      case "blueMain":
        return "text-blueButton";
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
      case "blue-secondary":
        return "text-[#004F9F]";
      default:
        return "text-black";
    }
  };

  // Función para obtener la clase CSS correspondiente al tipo de texto
  const getTypeClass = () => {
    switch (type) {
      case "bigTitle":
        return "text-5xl font-bold";
      case "title":
        return "mb-2 mt-4 font-bold text-base md:text-lg lg:text-xl";
      case "subtitle":
        return "block text-sm font-medium leading-6 font-bold text-sm md:text-base lg:text-lg";
      case "normal":
        return "text-xs md:text-sm lg:text-base";
      case "small":
        return "text-base";
      case "header":
        return "text-lg md:text-xl lg:text-2xl font-bold";
      case "description":
        return "text=base";

      default:
        return "text-xs md:text-sm lg:text-base";
    }
  };

  // Función para renderizar el elemento HTML adecuado según el tipo de texto
  const getElement = () => {
    switch (type) {
      case "bigTitle":
        return (
          <h1 className={`${getColorClass()} ${getTypeClass()}`}>{texto}</h1>
        );
      case "title":
        return (
          <h1 className={`${getColorClass()} ${getTypeClass()}`}>{texto}</h1>
        );
      case "subtitle":
        return (
          <h2 className={`${getColorClass()} ${getTypeClass()}`}>{texto}</h2>
        );
      case "normal":
        return (
          <p className={`${getColorClass()} ${getTypeClass()}`}>{texto}</p>
        );
      case "header":
        return (
          <h1 className={`${getColorClass()} ${getTypeClass()}`}>{texto}</h1>
        );
      default:
        return (
          <p className={`${getColorClass()} ${getTypeClass()}`}>{texto}</p>
        );
    }
  };

  // Renderizar el elemento de texto adecuado
  return getElement();
};

export default Text;
