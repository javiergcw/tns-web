// pages/view-product.js
"use client";
import "/app/globals.css";
import React from "react";
import MainLayout from "@/app/components/layout/drawerLayout";
import FiltersComponent from "@/app/components/view-product/view-product";
import PrivateRoute from "@/app/components/privateRoute"; // Importa el HOC PrivateRoute
import Text from "@/app/components/others/text/text";

const ViewProduct = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-start px-20 my-10 w-full">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">COMPRAS</h1>
        <div className="bg-bgPrimary p-6 rounded-lg shadow-md w-full">
          <FiltersComponent />
        </div>
      </div>
    </MainLayout>
  );
};

// Envuelve ViewProduct con PrivateRoute para proteger la ruta
export default PrivateRoute(ViewProduct);
