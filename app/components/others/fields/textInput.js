import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

/**
 * TextInput Component
 *
 * Este componente genera un input de texto con un label personalizable.
 *
 * @param {string} labelText - El texto que se mostrará en el label del input.
 * @param {string} labelColor - El color del texto del label ("blue", "green", "grey").
 * @param {string} inputSize - El tamaño del input ("small", "medium", "large").
 * @param {string} inputType - El tipo del input ("text", "email", "password").
 * @param {string} value - El valor del input.
 * @param {function} onChange - La función para manejar el cambio del input.
 *
 **/
const TextInput = ({
  labelText = "Label",
  labelColor = "blue",
  inputSize = "medium",
  inputType = "text",
  value = "",
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

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
      case "gray6th":
        return "text-gray6th";
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

  // Función para alternar la visibilidad de la contraseña
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-start">
      <label
        className={`mb-1 text-black text-sm font-medium ${getLabelColorClass()} `}
      >
        {labelText}
      </label>
      <div className="relative w-full">
        <input
          type={inputType === "password" && showPassword ? "text" : inputType}
          required
          autoComplete={getAutocompleteAttribute()}
          className={`block mb-5 pl-2 pr-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blueButton focus:border-blueButton sm:text-sm sm:leading-6 ${getInputSizeClass()} `}
          value={value}
          onChange={onChange}
        />
        {inputType === "password" && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
          >
            {showPassword ? (
              <FaEyeSlash className="h-5 w-5 mb-4 " />
            ) : (
              <FaEye className="h-5 w-5 mb-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default TextInput;
