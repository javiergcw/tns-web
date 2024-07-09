import React from 'react';

const ProveedorDetails = ({ proveedor, onClose }) => {
  if (!proveedor) {
    return <div className="text-center">Seleccione un proveedor para ver los detalles</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4">
      <div className="text-right">
        <button onClick={onClose} className="text-gray-600">&times;</button>
      </div>
      <div className="mb-4">
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <img src={proveedor.image} alt="Imagen del Proveedor" className="h-24 mx-auto mb-4" />
        </div>
        <div className="text-2xl font-bold text-blue-600 mb-2">Información del proveedor</div>
        <div className="text-lg font-semibold mb-2">{proveedor.title}</div>
        <div className="text-gray-700 mb-4 break-words">{proveedor.description}</div>
        <div className="text-lg">Valor: {proveedor.price}</div>
      </div>
    </div>
  );
};

export default ProveedorDetails;