"use client";
import "/app/globals.css";
import React, { useState } from "react";
import MainLayout from "@/app/components/layout/drawerLayout";
import CreatePurchaseForm from "@/app/components/others/container/createPurchaseForm";
import ProductForm from "@/app/components/others/fields/productForm";
import PrivateRoute from "@/app/components/privateRoute"; // Importa el HOC PrivateRoute

const CreateProduct = () => {
  const [products, setProducts] = useState([]);

  return (
    <MainLayout>
      <div className="w-full bg-bgPrimary min-h-screen px-4 md:px-20 py-10 overflow-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Crear Producto</h1>
        <div className="w-full bg-Primary p-4 md:p-8 rounded-lg  flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
          <div className="w-full md:w-1/2">
          <ProductForm setProducts={setProducts} />
          </div>
          <div className="w-full md:w-1/2">
          <CreatePurchaseForm  products={products} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// Envuelve CreateProduct con PrivateRoute para proteger la ruta
export default PrivateRoute(CreateProduct);
