"use client";
import "/app/globals.css";
import React, { useState } from "react";
import MainLayout from "@/app/components/layout/drawerLayout";
import CreatePurchaseForm from "@/app/components/others/container/createPurchaseForm";
import ProveedorForm from "@/app/components/others/fields/proveedorForm";
import PrivateRoute from "@/app/components/privateRoute"; // Importa el HOC PrivateRoute

const CreateProduct = () => {
  const [proveedores, setProveedores] = useState([]);

  return (
    <MainLayout>
      <div className="flex flex-col items-start my-10 px-20 w-full">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Crear Producto</h1>
        <div className="bgPrimary p-8 rounded-lg shadow-lg w-full max-w-6xl flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          <div className="md:w-1/2">
            <CreatePurchaseForm products={[]} proveedores={proveedores} />
          </div>
          <div className="md:w-1/2">
            <ProveedorForm setProveedores={setProveedores} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// Envuelve CreateProduct con PrivateRoute para proteger la ruta
export default PrivateRoute(CreateProduct);
