import React from "react";
import Image from "next/image";
const PurchaseDetail = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">Detalle de una compra</h1>
      <div className="grid grid-cols-2 gap-8">
        <div className="col-span-1">
          <h2 className="text-2xl font-bold text-blue-700">Computador</h2>
          <div className="text-green-600 font-bold mt-2 mb-4">Categoría Seleccionada</div>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in ex a lorem viverra eleifend ac ut massa. Vestibulum ante ipsum primis in faucibus orci.
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Vestibulum ante ipsum primis in faucibus orci.</li>
            <li>Consectetur adipiscing elit. Cras in ex.</li>
          </ul>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center bg-gray-200 p-2 rounded">
              <div className="font-bold">14-07-2024</div>
            </div>
            <div className="text-center bg-gray-200 p-2 rounded">
              <div className="font-bold">NOMBRE DEL LIDER</div>
            </div>
            <div className="text-center bg-gray-200 p-2 rounded">
              <div className="font-bold">ETAPA 1</div>
            </div>
          </div>
          <canvas id="literacyChart" className="w-full h-64"></canvas>
        </div>
        <div className="col-span-1">
          <div className="bg-gray-200 h-64 mb-8 flex justify-center items-center">
            <Image src="/path/to/your/upload-icon.png" alt="Upload Icon" width={100} height={100} />
          </div>
          <h2 className="text-2xl font-bold text-blue-700">Información del proveedor</h2>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in ex a lorem viverra eleifend ac ut massa. Vestibulum ante ipsum primis in faucibus orci.
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Vestibulum ante ipsum primis in faucibus orci.</li>
            <li>Consectetur adipiscing elit. Cras in ex.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetail;
