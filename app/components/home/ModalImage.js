"use client";

import React from "react";

export default function ModalImage({ setShowModal, imageUrl }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-[600px] max-w-3xl">
        {/* Botón de cierre */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          ×
        </button>

        {/* Imagen */}
        <img src={imageUrl} alt="Modal Image" className="w-full h-auto rounded-lg" />

        {/* Texto opcional */}
        
      </div>
    </div>
  );
}
