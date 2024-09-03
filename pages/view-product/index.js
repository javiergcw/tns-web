// pages/view-product.js
"use client";
import "/app/App.css";
import React from "react";
import FiltersComponent from "@/app/components/view-product/view-product";
import PrivateRoute from "@/app/components/privateRoute"; // Importa el HOC PrivateRoute
import DrawerLayout from "@/app/components/layout/drawerLayout";
import MainLayout from "@/app/components/layout/drawerLayout";
import Container from "@/app/components/dashboard/container/container";

const ViewProduct = () => {
  return (
    <MainLayout>
      <div className="w-full bg-bgPrimary">
        <FiltersComponent />
      </div>
    </MainLayout>

  );
};

// Envuelve ViewProduct con PrivateRoute para proteger la ruta
export default PrivateRoute(ViewProduct);
