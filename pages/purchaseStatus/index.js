"use client";
import React from "react";
import NormalButton from "@/app/components/others/button/normalButton";
import TextInput from "@/app/components/others/fields/textInput";
import "/app/globals.css";

export default function PurchaseStatus() {
  return (
    <div className="flex h-screen">
      {/* Sección izquierda - Imagen corporativa */}
      <div className="w-full h-screen m-0 bg-[#004F9F]">
        <img
          src="/images/logo-vertical.png"
          alt="Descripción de la imagen"
          className="w-screen h-screen"
        />
      </div>
      {/* Sección derecha - Formulario de consulta */}
      <div className="w-2/3 flex justify-center items-center bg-slate-100">
        <div className="w-2/3 p-8 bg-white shadow-md rounded-md">
          <h1 className="text-[#1e73be] text-2xl font-bold mb-6">
            CONSULTA ESTADO DE COMPRA
          </h1>
          <TextInput
            labelText="Ingresa tu número de compra"
            labelColor="grey"
            inputSize="large"
          />
          <div className="flex justify-between mt-6">
            <NormalButton color="red" size="medium" text="Cancelar" />
            <NormalButton color="blue" size="medium" text="Buscar" />
          </div>
        </div>
      </div>
    </div>
  );
}
