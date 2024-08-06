// ShoppingDetails.js

import React, { useState, useEffect } from "react";
import { getShoppingById } from "@/app/services/shoppingService";

const ShoppingDetails = ({ shoppingId }) => {
  const [shopping, setShopping] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShopping = async () => {
      try {
        const shoppingData = await getShoppingById(shoppingId);
        setShopping(shoppingData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShopping();
  }, [shoppingId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!shopping) {
    return <div>No se encontró la compra.</div>;
  }

  return (
    <div>
      <h1>Detalles de la Compra</h1>
      <p><strong>ID:</strong> {shopping.id}</p>
      <p><strong>Fecha de Creación:</strong> {new Date(shopping.created_at).toLocaleString()}</p>
      <p><strong>Fecha de Actualización:</strong> {new Date(shopping.updated_at).toLocaleString()}</p>
      <p><strong>Fecha de Solicitud:</strong> {new Date(shopping.request_date).toLocaleDateString()}</p>
      <p><strong>Fecha Pendiente:</strong> {new Date(shopping.pending_date).toLocaleDateString()}</p>
      <p><strong>Fecha de Aprobación:</strong> {new Date(shopping.date_approval).toLocaleDateString()}</p>
      <p><strong>Categoría:</strong> {shopping.category.name}</p>
      <p><strong>Estado:</strong> {shopping.status.name}</p>
      <p><strong>Usuario:</strong> {shopping.user.profile.name}</p>
      <h2>Productos</h2>
      <ul>
        {shopping.products.map((product) => (
          <li key={product.id}>
            <p><strong>Nombre:</strong> {product.name}</p>
            <p><strong>Descripción:</strong> {product.description}</p>
            <p><strong>Precio:</strong> ${product.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingDetails;
