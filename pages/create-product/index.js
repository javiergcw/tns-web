"use client";
import "/app/globals.css";
import React from "react";
import MainLayout from "@/app/components/layout/drawerLayout"; // Asegúrate de que la ruta sea correcta
import CreatePurchaseForm from "@/app/components/others/container/createPurchaseForm";
import ProveedorForm from "@/app/components/others/fields/proveedorForm";

export default function CreateProduct() {
  return (
    <MainLayout>
      <CreatePurchaseForm />
      <ProveedorForm />
    </MainLayout>
  );
}
