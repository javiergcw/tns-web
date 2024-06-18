'use client';
import React from "react";
import NormalButton from "@/app/components/others/button/normalButton";
import TextInput from "@/app/components/others/fields/textInput";
import Text from "@/app/components/others/text/text";
import "/app/globals.css";
import { ImagesPath } from "@/app/utils/assetsPath";

/**
 * PurchaseStatus Page
 * 
 * Esta página permite al usuario consultar el estado de una compra ingresando el número de compra.
 * Utiliza componentes reutilizables como `TextInput` y `NormalButton` para la estructura y el diseño.
 * 
 * @component
 */
export default function PurchaseStatus() {
  return (
    <div className="flex h-screen">
      {/* Sección izquierda - Imagen corporativa */}
      <div className="w-full h-screen m-0 bg-blue-700 flex justify-center items-center">
        <img
          src={ImagesPath.logoVertical}
          alt="Descripción de la imagen"
          className="w-2/3 h-2/3 object-contain"
        />
      </div>
      {/* Sección derecha - Formulario de consulta */}
      <div className="w-2/3 flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          {/* Título del formulario */}
          <Text texto="CONSULTA ESTADO DE COMPRA" color="blue" type="header" />
          {/* Campo de entrada para el número de compra */}
          <div className="mt-4">
            <TextInput
              labelText="Ingresa tu número de compra"
              labelColor="grey"
              inputSize="large"
            />
          </div>
          {/* Botones de acción */}
          <div className="flex justify-between ">
            <NormalButton color="green" size="large" text="Buscar" />
            <NormalButton color="red" size="large" text="Cancelar" />
          </div>
        </div>
      </div>
    </div>
  );
}
