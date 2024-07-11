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
      <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
        <div className="md:w-1/2 p-4">
          <CreatePurchaseForm products={[]} proveedores={proveedores} />
        </div>
        <div className="md:w-1/2 p-4">
          <ProveedorForm setProveedores={setProveedores} />
        </div>
      </div>
    </MainLayout>
  );
};

// Envuelve CreateProduct con PrivateRoute para proteger la ruta
export default PrivateRoute(CreateProduct);
