// pages/view-product.js
"use client";
import "/app/App.css";
import React from "react";
import FiltersComponent from "@/app/components/view-product/view-product";
import PrivateRoute from "@/app/components/privateRoute"; // Importa el HOC PrivateRoute
import DrawerLayout from "@/app/components/layout/drawerLayout";

const ViewProduct = () => {
  return (
    <DrawerLayout>
      <div className="app-container bg-bgPrimary">
        <FiltersComponent />
      </div>
    </DrawerLayout>
  );
};

// Envuelve ViewProduct con PrivateRoute para proteger la ruta
export default PrivateRoute(ViewProduct);
