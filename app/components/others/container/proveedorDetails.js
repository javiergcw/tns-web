import React from 'react';

const ProductDetails = ({ product, onClose }) => {
  if (!product) {
    return <div className="text-center">Seleccione un product para ver los detalles</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4">
      <div className="text-right">
        <button onClick={onClose} className="text-gray-600">&times;</button>
      </div>
      <div className="mb-4">
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <img src={product.image} alt="Imagen del product" className="h-24 mx-auto mb-4" />
        </div>
        <div className="text-2xl font-bold text-blue-600 mb-2">Información del product</div>
        <div className="text-lg font-semibold mb-2">{product.title}</div>
        <div className="text-gray-700 mb-4 break-words">{product.description}</div>
        <div className="text-lg">Valor: {product.price}</div>
      </div>
    </div>
  );
};

export default ProductDetails;