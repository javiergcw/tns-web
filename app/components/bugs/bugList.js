import React, { useEffect, useState } from 'react';
import { getAllBugs } from '@/app/services/bugService'; // Asegúrate de que esta ruta sea correcta
import Bug from '@/app/models/bugs/bugModel'; // Asegúrate de que esta ruta sea correcta

const BugList = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const bugData = await getAllBugs();
        setBugs(bugData);
      } catch (error) {
        setError('Error al cargar los bugs. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchBugs();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Lista de Bugs</h2>
      {bugs.length === 0 ? (
        <p>No hay bugs disponibles.</p>
      ) : (
        <ul>
          {bugs.map((bug) => (
            <li key={bug.id}>
              <h3>{bug.title}</h3>
              <p>Descripción: {bug.description}</p>
              <p>Categoría: {bug.category_id}</p>
              <p>Creado por: {bug.user ? bug.user.email : 'Desconocido'}</p>
              <p>Fecha de creación: {bug.created_at}</p>
              <p>Última actualización: {bug.updated_at}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BugList;
