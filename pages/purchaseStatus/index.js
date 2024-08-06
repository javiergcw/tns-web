'use client';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import NormalButton from "@/app/components/others/button/normalButton";
import TextInput from "@/app/components/others/fields/textInput";
import "/app/globals.css";
import { ImagesPath } from "@/app/utils/assetsPath";
import { getShoppingById } from "@/app/services/shoppingService";

/**
 * PurchaseStatus Page
 * 
 * Esta página permite al usuario consultar el estado de una compra ingresando el número de compra.
 * Utiliza componentes reutilizables como `TextInput` y `NormalButton` para la estructura y el diseño.
 * 
 * @component
 */
export default function PurchaseStatus() {
  const [purchaseId, setPurchaseId] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    console.log("Input Changed:", e.target.value); // Agregado para depuración
    setPurchaseId(e.target.value);
  };

  const handleSearchClick = async () => {
    console.log("Search Clicked"); // Agregado para depuración
    try {
      const response = await getShoppingById(purchaseId);
      console.log("API Response:", response); // Agregado para depuración
      setError("");
      // Navegar a la vista de detalles con los datos de la compra
      router.push({
        pathname: '/shopping/detail',
        query: { data: JSON.stringify(response) },
      });
    } catch (error) {
      console.error("Error al obtener el estado de la compra:", error); // Agregado para depuración
      setError("Error al obtener el estado de la compra. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sección izquierda - Imagen corporativa */}
      <div className="w-full h-screen m-0 bg-blueSecundary">
        <img
          src={ImagesPath.logoVertical}
          alt="Descripción de la imagen"
          className="w-screen h-screen"
        />
      </div>
      {/* Sección derecha - Formulario de consulta */}
      <div className="w-2/3 flex justify-center items-center bg-slate-100">
        <div className="w-2/3 p-8 bg-white shadow-md rounded-md">
          {/* Título del formulario */}
          <h1 className="text-[#1e73be] text-2xl font-bold mb-6">
            CONSULTA ESTADO DE COMPRA
          </h1>
          {/* Campo de entrada para el número de compra */}
          <TextInput
            labelText="Ingresa tu número de compra"
            labelColor="grey"
            inputSize="large"
            value={purchaseId}
            onChange={handleInputChange}
          />
          {/* Botones de acción */}
          <div className="flex justify-between mt-6">
            <NormalButton color="red" size="medium" text="Cancelar" />
            <NormalButton color="blue" size="medium" text="Buscar" onClick={handleSearchClick} />
          </div>
          {/* Mostrar errores */}
          {error && (
            <div className="mt-6 text-red-500">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
