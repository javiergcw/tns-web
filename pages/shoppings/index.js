'use client';
import React, { useState } from "react";
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
  const [purchaseStatus, setPurchaseStatus] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    console.log("Input Changed:", e.target.value); // Agregado para depuración
    setPurchaseId(e.target.value);
  };

  const handleSearchClick = async () => {
    console.log("Search Clicked"); // Agregado para depuración
    try {
      const response = await getShoppingById(purchaseId);
      console.log("API Response:", response); // Agregado para depuración
      setPurchaseStatus(response);
      setError("");
    } catch (error) {
      console.error("Error al obtener el estado de la compra:", error); // Agregado para depuración
      setPurchaseStatus(null);
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
          {/* Mostrar el estado de la compra */}
          {purchaseStatus && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Estado de la compra:</h2>
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Campo</th>
                    <th className="py-2 px-4 border-b">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">ID de la compra</td>
                    <td className="py-2 px-4 border-b">{purchaseStatus.id}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Fecha de solicitud</td>
                    <td className="py-2 px-4 border-b">{new Date(purchaseStatus.requestDate).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Fecha pendiente</td>
                    <td className="py-2 px-4 border-b">{new Date(purchaseStatus.pendingDate).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Fecha de aprobación</td>
                    <td className="py-2 px-4 border-b">{new Date(purchaseStatus.dateApproval).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Categoría</td>
                    <td className="py-2 px-4 border-b">{purchaseStatus.category.name}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Estado</td>
                    <td className="py-2 px-4 border-b">{purchaseStatus.status.name}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Usuario</td>
                    <td className="py-2 px-4 border-b">{purchaseStatus.user.profile.name}</td>
                  </tr>
                </tbody>
              </table>
              <h3 className="text-lg font-semibold mt-4">Productos:</h3>
              <table className="min-w-full bg-white border border-gray-300 mt-2">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Nombre</th>
                    <th className="py-2 px-4 border-b">Descripción</th>
                    <th className="py-2 px-4 border-b">Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseStatus.products.map((product) => (
                    <tr key={product.id}>
                      <td className="py-2 px-4 border-b">{product.name}</td>
                      <td className="py-2 px-4 border-b">{product.description}</td>
                      <td className="py-2 px-4 border-b">${product.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
