// components/CreateBugForm.js
import React, { useState } from 'react';
import { createBug } from '@/app/services/bugService';

const CreateBugForm = () => {
  const [title, setTitle] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [description, setDescription] = useState('');

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Categoría ID:</label>
        <input
          type="text"
          value={category_id}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Crear Bug</button>
    </form>
  );
};

export default CreateBugForm;
