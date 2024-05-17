import React from "react";

const TextInput = ({
  labelText = "Label",
  labelColor = "blue",
  inputSize = "medium",
  inputType = "text",
}) => {
  // Función para obtener el tamaño del input
  const getInputSizeClass = () => {
    switch (inputSize) {
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
  // Función para obtener el atributo autocomplete
  const getAutocompleteAttribute = () => {
    switch (inputType) {
      case "email":
        return "email";
      case "password":
        return "current-password";
      case "text":
        return "text";
      default:
        return "text";
    }
  };

  return (
    <div className="flex flex-col items-start">
      <label className={`mb-1 text-sm font-medium ${getLabelColorClass()} `}>
        {labelText}
      </label>
      <input
        type={inputType}
        required
        autoComplete={getAutocompleteAttribute()}
        className={`block mb-5 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${getInputSizeClass()} `}
      />
    </div>
  );
};

export default TextInput;
