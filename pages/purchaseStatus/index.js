'use client';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import NormalButton from "@/app/components/others/button/normalButton";
import TextInput from "@/app/components/others/fields/textInput";
import "/app/globals.css";
import { ImagesPath } from "@/app/utils/assetsPath";
import CustomComponent from "@/app/components/product-detail/purchase_detail";
import { getShoppingById } from "@/app/services/shoppingService";

export default function PurchaseStatus() {
  const [purchaseId, setPurchaseId] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [shoppingData, setShoppingData] = useState(null);

  const handleInputChange = (e) => {
    setPurchaseId(e.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const response = await getShoppingById(purchaseId);
      setShoppingData(response);
      setError("");
      setShowModal(true);
    } catch (error) {
      console.error("Error al obtener el estado de la compra:", error);
      setError("Error al obtener el estado de la compra. Por favor, intenta nuevamente.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setShoppingData(null);
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-white rounded-lg p-4 shadow-lg w-3/4 max-w-5xl h-auto max-h-[90vh] overflow-y-auto relative pt-12">
            <h2 className="text-2xl font-bold mb-4 text-center">Detalle de la compra</h2> {/* Título agregado */}
            <CustomComponent shoppingId={purchaseId} />
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-2xl"
              onClick={closeModal}
            >
              ✖️
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
