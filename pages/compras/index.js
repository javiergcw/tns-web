import React, { useState } from 'react';
import MainLayout from '@/app/components/layout/drawerLayout'; // Ajusta la ruta según tu estructura
import ProveedorForm from '@/app/components/others/fields/productForm'; // Ajusta la ruta según tu estructura
import CreatePurchaseForm from '@/app/components/others/container/createPurchaseForm'; // Ajusta la ruta según tu estructura
import PrivateRoute from '@/app/components/privateRoute'; // Importa el HOC PrivateRoute

const ComprasPage = () => {
  const [products, setProducts] = useState([]);

  const handleProductsChange = (newProducts) => {
    setProducts(newProducts);
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Compras</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CreatePurchaseForm products={products} />
          <ProveedorForm onProductsChange={handleProductsChange} />
        </div>
      </div>
    </MainLayout>
  );
};

// Envuelve ComprasPage con PrivateRoute para proteger la ruta
export default PrivateRoute(ComprasPage);
