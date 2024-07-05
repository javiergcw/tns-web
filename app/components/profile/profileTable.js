// src/components/ProfileTable.js
import { useState, useEffect } from 'react';
import { getAllProfiles } from '@/app/services/profileService';

const ProfileTable = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await getAllProfiles();
        setProfiles(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profiles:', error);  // Añade esta línea para depuración
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) {
    return <p>Cargando perfiles...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-1 px-2 border-b-2 border-gray-300 text-sm">ID</th>
            <th className="py-1 px-2 border-b-2 border-gray-300 text-sm">Nombre</th>
            <th className="py-1 px-2 border-b-2 border-gray-300 text-sm">Tipo de Identificación</th>
            <th className="py-1 px-2 border-b-2 border-gray-300 text-sm">Número de Identificación</th>
            <th className="py-1 px-2 border-b-2 border-gray-300 text-sm">Rol ID</th>
            <th className="py-1 px-2 border-b-2 border-gray-300 text-sm">Usuario ID</th>
            <th className="py-1 px-2 border-b-2 border-gray-300 text-sm">Creado en</th>
            <th className="py-1 px-2 border-b-2 border-gray-300 text-sm">Actualizado en</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map(profile => (
            <tr key={profile.id} className="border-b border-gray-200">
              <td className="py-1 px-2 text-sm">{profile.id}</td>
              <td className="py-1 px-2 text-sm">{profile.name}</td>
              <td className="py-1 px-2 text-sm">{profile.identificationType}</td>
              <td className="py-1 px-2 text-sm">{profile.identificationNumber}</td>
              <td className="py-1 px-2 text-sm">{profile.rolId}</td>
              <td className="py-1 px-2 text-sm">{profile.userId}</td>
              <td className="py-1 px-2 text-sm">{new Date(profile.createdAt).toLocaleString()}</td>
              <td className="py-1 px-2 text-sm">{new Date(profile.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileTable;
