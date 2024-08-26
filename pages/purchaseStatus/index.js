'use client';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import NormalButton from "@/app/components/others/button/normalButton";
import TextInput from "@/app/components/others/fields/textInput";
import "/app/globals.css";
import { ImagesPath } from "@/app/utils/assetsPath";
import Image from "next/image";
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
    <div className="w-full flex flex-col lg:flex-row h-screen  bg-slate-100">
      {/* Sección izquierda - Imagen corporativa */}
      <div className="w-full lg:w-2/4 h-48 lg:h-screen flex justify-center items-center ">
        <Image
          src={ImagesPath.logoVertical}
          alt="Descripción de la imagen"
          layout="intrinsic"
          width={300}
          height={300}
          className="object-contain lg:object-scale-down max-w-full max-h-full"
        />
      </div>
      <br/>
      {/* Sección derecha - Formulario de consulta */}
      <div className="w-full lg:w-2/4 flex justify-center items-center bg-slate-100 px-4 lg:px-0">
        <div className="w-full lg:w-2/3 p-4 lg:p-8 bg-white shadow-md rounded-md">
          {/* Título del formulario */}
          <h1 className="text-[#1e73be] text-xl lg:text-2xl font-bold mb-4 lg:mb-6 text-center lg:text-left">
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
          <div className="flex justify-between mt-4 lg:mt-6 space-x-4">
            <NormalButton color="blue" size="medium" text="Buscar" onClick={handleSearchClick} />
            <NormalButton color="red" size="medium" text="Cancelar" />
          </div>
          {/* Mostrar errores */}
          {error && (
            <div className="mt-4 lg:mt-6 text-red-500">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4 lg:p-0">
          <div className="bg-white rounded-lg p-4 shadow-lg w-full lg:w-3/4 max-w-5xl h-auto max-h-[90vh] overflow-y-auto relative">
            <h2 className="text-xl lg:text-2xl font-bold mb-4 text-center">Detalle de la compra</h2> {/* Título agregado */}
            <CustomComponent shoppingId={purchaseId} />
            <button
              className="absolute top-2 right-2 lg:top-4 lg:right-4 text-gray-700 hover:text-gray-900 text-xl lg:text-2xl"
              onClick={closeModal}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
