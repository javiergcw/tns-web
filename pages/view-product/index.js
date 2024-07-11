"use client";
import "/app/globals.css";
import React from "react";
import MainLayout from "@/app/components/layout/drawerLayout";
import { useState, useEffect } from "react";
import Container from "@/app/components/dashboard/container/container";
import FiltersComponent from "@/app/components/view-product/view-product";
import Text from "@/app/components/others/text/text";
import PrivateRoute from "@/app/components/privateRoute"; // Importa el HOC PrivateRoute

const ViewProduct = () => {
  return (
    <MainLayout>
      <div className="flex h-screen w-full overflow-hidden">
        <Container>
          <hr className="my-5" />
          <Text texto="COMPRAS" color="blue-secondary" type="header" />
          <hr className="my-5" />
          <FiltersComponent />
          <product />
        </Container>
      </div>
    </MainLayout>
  );
};

// Envuelve ViewProduct con PrivateRoute para proteger la ruta
export default PrivateRoute(ViewProduct);
