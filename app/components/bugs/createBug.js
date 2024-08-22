import React, { useState } from 'react';
import { createBug } from '@/app/services/bugService';

const CreateBugForm = () => {
  const [title, setTitle] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [description, setDescription] = useState('');

  // Opciones predefinidas para el dropdown de categorías
  const categoryOptions = [
    { value: '1', label: 'Bug de UI' },
    { value: '2', label: 'Error de lógica' },
    { value: '3', label: 'Problema de rendimiento' },
    { value: '4', label: 'Otro tipo de bug' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = localStorage.getItem('userId');
    if (!user_id) {
      alert('User not logged in');
      return;
    }

    const bugData = {
      title,
      category_id,
      description,
      user_id,
    };

    try {
      const newBug = await createBug(bugData);
      console.log('Bug creado:', newBug);
      alert('Bug creado con éxito');
    } catch (error) {
      console.error('Error al crear el bug:', error);
      alert('Error al crear el bug');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label className="text-gray-700">Título:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded bg-white text-black"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700">Categoría:</label>
        <select
          value={category_id}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded bg-white text-black"
        >
          <option value="" disabled>Seleccione una categoría</option>
          {categoryOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700">Descripción:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded bg-white text-black"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default CreateBugForm;
