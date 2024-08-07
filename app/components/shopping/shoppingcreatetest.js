import React, { useState } from 'react';
import { createShopping } from '@/app/services/shoppingService';

const CreateShoppingForm = () => {
  const [formData, setFormData] = useState({
    category_id: 1,
    status_id: 1,
    request_date: '2024-12-15',
    pending_date: '2024-12-16',
    date_approval: '2024-12-17',
    products: [
      {
        name: 'New Laptop',
        url: 'http://example.com/new-laptop',
        description: 'Latest model of our laptop range.',
        price: 1200
      },
      {
        name: 'Smartphone',
        url: 'http://example.com/smartphone',
        description: 'Newest smartphone with advanced features.',
        price: 800
      }
    ]
  });

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const shoppingResponse = await createShopping(formData);
      setResponse(shoppingResponse);
      setError(null);
    } catch (err) {
      setError('Error al crear la compra');
      setResponse(null);
    }
  };

  return (
    <div>
      <h1>Crear Nueva Compra</h1>
      <form onSubmit={handleSubmit}>
        {/* Aquí puedes añadir campos adicionales para editar el formulario si lo deseas */}
        <button type="submit">Crear Compra</button>
      </form>
      {response && (
        <div>
          <h2>Respuesta del Servidor:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateShoppingForm;
