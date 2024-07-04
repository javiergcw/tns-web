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
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b-2 border-gray-300">ID</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Nombre</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Tipo de Identificación</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Número de Identificación</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Rol ID</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Usuario ID</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Creado en</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Actualizado en</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map(profile => (
            <tr key={profile.id}>
              <td className="py-2 px-4 border-b">{profile.id}</td>
              <td className="py-2 px-4 border-b">{profile.name}</td>
              <td className="py-2 px-4 border-b">{profile.identificationType}</td>
              <td className="py-2 px-4 border-b">{profile.identificationNumber}</td>
              <td className="py-2 px-4 border-b">{profile.rolId}</td>
              <td className="py-2 px-4 border-b">{profile.userId}</td>
              <td className="py-2 px-4 border-b">{new Date(profile.createdAt).toLocaleString()}</td>
              <td className="py-2 px-4 border-b">{new Date(profile.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileTable;
