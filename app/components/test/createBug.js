import React, { useState } from 'react';
import { createBug } from '@/app/services/bugService';

const CreateBugForm = () => {
    const [title, setTitle] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [description, setDescription] = useState('');
    const [userId, setUserId] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');

        const bugData = {
            title,
            categoryId: parseInt(categoryId),
            description,
            userId: parseInt(userId)
        };

        try {
            const response = await createBug(bugData);
            setSuccessMessage('Bug creado con éxito');
            setTitle('');
            setCategoryId('');
            setDescription('');
            setUserId('');
        } catch (error) {
            setError('Error al crear el bug. Inténtalo de nuevo.');
        }
    };

    return (
        <div>
            <h2>Crear Nuevo Bug</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Título:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="categoryId">ID de Categoría:</label>
                    <input
                        type="number"
                        id="categoryId"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Descripción:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="userId">ID de Usuario:</label>
                    <input
                        type="number"
                        id="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Crear Bug</button>
            </form>
        </div>
    );
};

export default CreateBugForm;
