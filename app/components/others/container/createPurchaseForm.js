import React, { useState, useEffect } from 'react';
import { getCategories } from '@/app/services/categoryService';
import { createShopping } from '@/app/services/shoppingService';

const CreatePurchaseForm = ({ products }) => {
  const [categories, setCategories] = useState([]);
  const [category_id, setCategoryId] = useState('');
  const [status_id, setStatusId] = useState('');
  const [request_date, setRequestDate] = useState('');
  const [pending_date, setPendingDate] = useState('');
  const [date_approval, setDateApproval] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!termsAccepted) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }
    const shoppingData = {
      category_id,
      status_id,
      request_date,
      pending_date,
      date_approval,
    };
    try {
      await createShopping(shoppingData, products);
      alert('Compra creada exitosamente');
    } catch (error) {
      console.error('Error creating purchase:', error);
      alert('Error al crear la compra');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Creación de compra</h2>
      <div className="mb-4">
        <select
          value={category_id}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <input
          type="number"
          name="status_id"
          placeholder="ID del Estado"
          value={status_id}
          onChange={(e) => setStatusId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="date"
          name="request_date"
          placeholder="Fecha de Solicitud"
          value={request_date}
          onChange={(e) => setRequestDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="date"
          name="pending_date"
          placeholder="Fecha Pendiente"
          value={pending_date}
          onChange={(e) => setPendingDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="date"
          name="date_approval"
          placeholder="Fecha de Aprobación"
          value={date_approval}
          onChange={(e) => setDateApproval(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="mr-2"
          required
        />
        <label>Acepto los términos y condiciones</label>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        Registrar
      </button>
    </form>
  );
};

export default CreatePurchaseForm;
