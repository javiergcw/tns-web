"use client";
import React from "react";

const Text = ({ texto, color = "black", type = "normal" }) => {
  // Función para obtener el color de texto
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

  // Función para obtener las clases según el tipo de texto
  const getTypeClass = () => {
    switch (type) {
      case "title":
        return "text-center md:text-center mb-4 mt-4 font-bold text-2xl";
      case "subtitle":
        return "block text-sm font-medium leading-6 mb-10 font-bold text-xl";
      case "normal":
        return "text-base";
      default:
        return "text-base";
    }
  };

  // Función para obtener el elemento adecuado según el tipo de texto
  const getElement = () => {
    switch (type) {
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
      default:
        return (
          <p className={`${getColorClass()} ${getTypeClass()}`}>{texto}</p>
        );
    }
  };

  return getElement();
};

export default Text;
